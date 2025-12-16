import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InstallPWA = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showInstall, setShowInstall] = useState(false);

    useEffect(() => {
        const handler = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowInstall(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        // Check if already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setShowInstall(false);
        }

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            setDeferredPrompt(null);
            setShowInstall(false);
        }
    };

    return (
        <AnimatePresence>
            {showInstall && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    style={{
                        position: 'fixed',
                        bottom: '100px', // Above bottom nav
                        left: '24px',
                        right: '24px',
                        zIndex: 50,
                        display: 'flex',
                        justifyContent: 'center',
                        pointerEvents: 'none' // wrapper shouldn't block
                    }}
                >
                    <button
                        onClick={handleInstall}
                        style={{
                            pointerEvents: 'auto',
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--accent-primary)',
                            padding: '12px 24px',
                            borderRadius: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            color: 'var(--text-primary)',
                            boxShadow: 'var(--shadow-lg)',
                            fontWeight: 600
                        }}
                    >
                        <Download size={20} color="var(--accent-primary)" />
                        <span>Install App</span>
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default InstallPWA;
