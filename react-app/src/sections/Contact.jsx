import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';
import useAlert from '../hooks/useAlert.js';
import Alert from '../components/Alert.jsx';

const Contact = () => {
  const formRef = useRef();
  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: 'Pushkal Vashist', // Updated from your resume [cite: 1]
          from_email: form.email,
          to_email: 'pushkal.vashist@gmail.com', // Updated [cite: 2]
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
      );

      setLoading(false);
      showAlert({
        text: 'Message sent successfully! I will get back to you soon. 🚀',
        type: 'success',
      });

      // Reset form
      setForm({ name: '', email: '', message: '' });
      
      // Auto-hide alert after 5 seconds
      setTimeout(() => {
        hideAlert();
      }, 5000); 

    } catch (error) {
      setLoading(false);
      console.error(error);
      showAlert({
        text: "Something went wrong. Please try again or email me directly.",
        type: 'danger',
      });
    }
  };

  return (
    <section className="c-space my-20" id="contact">
      {alert.show && <Alert {...alert} />}

      <div className="relative min-h-screen flex items-center justify-center flex-col py-10">
        <div className="relative w-full max-w-6xl rounded-3xl border border-white/10 bg-black-200/80 overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="h-14 px-5 sm:px-7 border-b border-white/10 bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-red-400/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <span className="w-3 h-3 rounded-full bg-green-400/80" />
            </div>
            <div className="hidden sm:flex px-4 py-1.5 rounded-full border border-white/10 bg-black/40 text-xs text-gray-400">
              contact.pushkal.dev
            </div>
            <div className="text-gray-500 text-2xl leading-none">+</div>
          </div>

          <div className="relative p-4 sm:p-8 lg:p-10">
            <img src="/assets/terminal.png" alt="terminal" className="absolute inset-0 h-full w-full object-cover opacity-25" />
            <div className="absolute inset-0 bg-black/50" />

            <div className="relative z-10 w-full max-w-2xl mx-auto glass-container p-8 sm:p-12 rounded-3xl border border-white/10 bg-black/60 backdrop-blur-md">
              <h3 className="text-3xl sm:text-4xl font-bold text-white font-generalsans">Let's Connect</h3>
              <p className="text-lg text-gray-400 mt-4 leading-relaxed">
                Whether you want to discuss <span className="text-blue-400">AI solutions</span>,
                <span className="text-purple-400"> scalable web apps</span>, or potential collaborations,
                my inbox is always open.
              </p>

              <form ref={formRef} onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-name" className="text-sm font-medium text-gray-300 ml-1">
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-600"
                    placeholder="Pushkal Vashist"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-email" className="text-sm font-medium text-gray-300 ml-1">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-600"
                    placeholder="pushkal.vashist@gmail.com"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-message" className="text-sm font-medium text-gray-300 ml-1">
                    Your Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    autoComplete="off"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 transition-all resize-none placeholder:text-gray-600"
                    placeholder="I'm interested in working with you on an AI project..."
                  />
                </div>

                <button
                  className="mt-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Transmitting Data...' : 'Submit Message'}
                  {!loading && <img src="/assets/arrow-up.png" alt="arrow" className="w-4 h-4" />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;