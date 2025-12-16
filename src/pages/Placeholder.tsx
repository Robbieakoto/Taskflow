

const Placeholder = ({ title }: { title: string }) => (
    <div className="fade-in" style={{ textAlign: 'center', paddingTop: '100px', color: 'var(--text-secondary)' }}>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '24px' }}>{title}</h2>
        <p>This feature is coming soon.</p>
    </div>
);
export default Placeholder;
