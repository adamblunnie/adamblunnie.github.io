// Original local badges use familiar language notation, without remote assets
// or an icon dependency. The adjacent visible name supplies the accessible label.
export function LanguageIcon({ name }) {
  const shell = name === "bash" || name === "powershell";
  const web = name === "html" || name === "css";
  const symbols = {
    python: "Py",
    bash: "$_",
    powershell: ">_",
    php: "php",
    html: "<>",
    css: "#",
  };
  return (
    <svg
      className="language-icon"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {shell ? (
        <>
          <rect
            x="4"
            y="7"
            width="40"
            height="34"
            rx="5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path d="M4 15h40" stroke="currentColor" />
          <circle cx="10" cy="11" r="1" fill="currentColor" />
        </>
      ) : web ? (
        <path
          d="M7 5h34l-4 32-13 6-13-6L7 5Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      ) : name === "php" ? (
        <ellipse
          cx="24"
          cy="24"
          rx="21"
          ry="15"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      ) : (
        <rect
          x="5"
          y="5"
          width="38"
          height="38"
          rx="11"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      )}
      <text
        x="24"
        y={shell ? "31" : "30"}
        fill="currentColor"
        textAnchor="middle"
        fontFamily="monospace"
        fontWeight="600"
        fontSize={name === "php" ? "16" : "19"}
      >
        {symbols[name] || "{}"}
      </text>
    </svg>
  );
}
