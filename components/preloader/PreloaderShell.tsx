// Server Component: passthrough to the Client <Preloader>. The critical
// @keyframes `preloader-draw` that draws the logo stroke lives in
// app/globals.css (not inlined here) because React 19's HostHoistable
// behaviour for sibling <style dangerouslySetInnerHTML> was hoisting the
// node to <head> in a way that conflicted with the reconciler — producing
// `removeChild` NotFoundError on commit. Keeping CSS in the global stylesheet
// eliminates the hoist hazard entirely.

import { Preloader } from "./Preloader";

interface PreloaderShellProps {
  copy: {
    assembling: string;
    labels: {
      shaders: string;
      textures: string;
      scene: string;
      composing: string;
      timeout: string;
    };
    arabicBadge: string;
  };
}

export function PreloaderShell({ copy }: PreloaderShellProps) {
  return <Preloader copy={copy} />;
}
