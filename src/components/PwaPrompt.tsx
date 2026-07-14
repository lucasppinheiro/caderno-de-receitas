import { useRegisterSW } from "virtual:pwa-register/react";
import styles from "../styles/App.module.css";

export function PwaPrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker
  } = useRegisterSW();

  if (!offlineReady && !needRefresh) return null;

  return (
    <aside className={styles.pwaNotice} aria-live="polite" aria-atomic="true">
      <p>{needRefresh ? "Nova versão disponível" : "Aplicativo pronto para uso offline"}</p>
      <div>
        {needRefresh && (
          <button type="button" onClick={() => void updateServiceWorker(true)}>
            Atualizar agora
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            setOfflineReady(false);
            setNeedRefresh(false);
          }}
        >
          {needRefresh ? "Agora não" : "Fechar"}
        </button>
      </div>
    </aside>
  );
}
