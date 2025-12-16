import React from 'react';
import { Bell, BellOff, Volume2, VolumeX } from 'lucide-react';
import { useNotificationSettings } from '../hooks/useNotificationSettings';
import { notificationService } from '../services/notificationService';

const Settings: React.FC = () => {
    const { settings, updateSettings } = useNotificationSettings();
    const [permissionStatus, setPermissionStatus] = React.useState<NotificationPermission>('default');

    React.useEffect(() => {
        if ('Notification' in window) {
            setPermissionStatus(Notification.permission);
        }
    }, []);

    const requestPermission = async () => {
        const granted = await notificationService.requestPermission();
        if (granted) {
            setPermissionStatus('granted');
        } else {
            setPermissionStatus(Notification.permission);
        }
    };

    const SettingToggle = ({
        label,
        description,
        enabled,
        onChange,
        icon: Icon,
        disabled = false
    }: {
        label: string;
        description: string;
        enabled: boolean;
        onChange: (value: boolean) => void;
        icon: any;
        disabled?: boolean;
    }) => (
        <div
            className="glass-panel"
            style={{
                padding: '16px',
                borderRadius: '12px',
                marginBottom: '16px',
                opacity: disabled ? 0.5 : 1,
                pointerEvents: disabled ? 'none' : 'auto'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flex: 1 }}>
                    <Icon size={20} color={enabled ? 'var(--accent-primary)' : 'var(--text-secondary)'} />
                    <div>
                        <div style={{ fontSize: '15px', fontWeight: 500, marginBottom: '4px' }}>{label}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{description}</div>
                    </div>
                </div>
                <button
                    onClick={() => onChange(!enabled)}
                    style={{
                        width: '48px',
                        height: '28px',
                        borderRadius: '14px',
                        background: enabled ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                        position: 'relative',
                        transition: 'background 0.3s'
                    }}
                >
                    <div
                        style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '10px',
                            background: 'white',
                            position: 'absolute',
                            top: '4px',
                            left: enabled ? '24px' : '4px',
                            transition: 'left 0.3s',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}
                    />
                </button>
            </div>
        </div>
    );

    return (
        <div className="fade-in">
            <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>Settings</h1>

            {/* Notification Permission Banner */}
            {permissionStatus !== 'granted' && (
                <div
                    className="glass-panel"
                    style={{
                        padding: '16px',
                        borderRadius: '12px',
                        marginBottom: '24px',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid var(--accent-danger)'
                    }}
                >
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <BellOff size={20} color="var(--accent-danger)" style={{ marginTop: '2px' }} />
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>
                                Notifications Disabled
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                                Enable notifications to receive reminders and alerts for your tasks.
                            </div>
                            <button
                                onClick={requestPermission}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '8px',
                                    background: 'var(--accent-danger)',
                                    color: 'white',
                                    fontSize: '13px',
                                    fontWeight: 500
                                }}
                            >
                                Enable Notifications
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <h2 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Notifications
            </h2>

            <SettingToggle
                label="All Notifications"
                description="Master switch for all notifications"
                enabled={settings.enabled}
                onChange={(value) => updateSettings({ enabled: value })}
                icon={settings.enabled ? Bell : BellOff}
                disabled={permissionStatus !== 'granted'}
            />

            <SettingToggle
                label="Task Reminders"
                description="Get notified at your scheduled reminder times"
                enabled={settings.reminders}
                onChange={(value) => updateSettings({ reminders: value })}
                icon={Bell}
                disabled={!settings.enabled || permissionStatus !== 'granted'}
            />

            <SettingToggle
                label="Overdue Task Alerts"
                description="Receive alerts 30 minutes after tasks become overdue"
                enabled={settings.overdueTasks}
                onChange={(value) => updateSettings({ overdueTasks: value })}
                icon={Bell}
                disabled={!settings.enabled || permissionStatus !== 'granted'}
            />

            <SettingToggle
                label="Sound & Vibration"
                description="Play sound and vibrate for notifications"
                enabled={settings.sound}
                onChange={(value) => updateSettings({ sound: value })}
                icon={settings.sound ? Volume2 : VolumeX}
                disabled={!settings.enabled || permissionStatus !== 'granted'}
            />

            <div className="glass-panel" style={{ padding: '16px', borderRadius: '12px', marginTop: '24px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>Note:</strong> Notifications work best when TaskFlow is installed as an app on your device.
                    On iOS, you may need to add TaskFlow to your home screen for notifications to work reliably.
                </div>
            </div>
        </div>
    );
};

export default Settings;
