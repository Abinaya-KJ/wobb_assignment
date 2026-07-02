interface VerifiedBadgeProps {
  verified: boolean;
}

export function VerifiedBadge({ verified }: VerifiedBadgeProps) {
  if (!verified) return null;
  return (
    <span
      className="verified-badge"
      title="Verified"
    >
      <svg width="9" height="9" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="3">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    </span>
  );
}
