import { useEffect, useRef, useState } from 'react';
import { useProgress } from '@react-three/drei';
import Loader from './Loader.jsx';

// How long to wait before revealing the page regardless of loader state.
const MAX_WAIT_MS = 4000;

// Module scope: the boot animation is a one-time brand moment, not something to
// replay every time the user navigates back to "/".
let hasBooted = false;

/**
 * Gates the full-screen boot Loader on 3D asset progress.
 *
 * Only mount this on routes that actually render a <Canvas>. drei's progress
 * store initialises to { active: false, progress: 0 } and is driven solely by
 * THREE.DefaultLoadingManager, so on a route with no 3D the old condition
 * (!active && progress >= 100) is never satisfied and the loader hangs forever.
 *
 * Three independent guarantees, all needed:
 *   1. Scope      - 3D-free routes never mount this, so they cannot hang.
 *   2. Evidence   - require that loading actually started before hiding on
 *                   progress, so the initial zero state is not mistaken for done.
 *   3. Timeout    - reveal regardless after MAX_WAIT_MS. Load-bearing: the
 *                   loading manager does not fire onLoad on every error path,
 *                   and About's globe fetches its textures from unpkg.com,
 *                   entirely outside the manager. Without this, one failed
 *                   request leaves a permanent black screen.
 */
const SceneGate = () => {
  const { active, progress } = useProgress();
  const [visible, setVisible] = useState(() => !hasBooted);
  const started = useRef(false);

  useEffect(() => {
    if (!visible) return undefined;
    const timeout = setTimeout(() => setVisible(false), MAX_WAIT_MS);
    return () => clearTimeout(timeout);
  }, [visible]);

  useEffect(() => {
    if (active) started.current = true;
    if (active) return undefined;
    if (!started.current && progress < 100) return undefined;

    const timeout = setTimeout(() => setVisible(false), 400);
    return () => clearTimeout(timeout);
  }, [active, progress]);

  useEffect(() => {
    if (!visible) hasBooted = true;
  }, [visible]);

  return visible ? <Loader /> : null;
};

export default SceneGate;
