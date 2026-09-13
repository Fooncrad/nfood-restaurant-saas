import { useEffect, useRef } from "react";
import { trpc } from "@/lib/trpc";

const WRAPPER_CLASS = "gtranslate_wrapper";

export function GTranslateWidget() {
  const siteMeta = trpc.platform.publicSiteMeta.useQuery(undefined, { staleTime: 5 * 60 * 1000, retry: false });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const injectedRef = useRef<string | null>(null);
  const code = siteMeta.data?.translateWidgetCode?.trim() ?? "";

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!code || !wrapper || injectedRef.current === code) return;
    wrapper.innerHTML = "";
    const container = document.createElement("div");
    container.innerHTML = code;
    container.querySelectorAll(`.${WRAPPER_CLASS}`).forEach((node) => node.remove());
    container.querySelectorAll("script").forEach((script) => {
      const fresh = document.createElement("script");
      for (const attribute of Array.from(script.attributes)) fresh.setAttribute(attribute.name, attribute.value);
      if (script.textContent) fresh.textContent = script.textContent;
      wrapper.appendChild(fresh);
    });
    injectedRef.current = code;
    return () => {
      delete (window as unknown as { gtranslateSettings?: unknown }).gtranslateSettings;
      injectedRef.current = null;
    };
  }, [code]);

  if (!code) return null;
  return <div className={WRAPPER_CLASS} ref={wrapperRef} />;
}