import { forwardRef, useState } from "react";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Password field with a show/hide toggle. Built on the same visual
 * language as Input rather than wrapping it, since the toggle button needs
 * to sit inside the field's own padding.
 */
const PasswordInput = forwardRef(({ className, label, error, id, ...props }, ref) => {
  const [visible, setVisible] = useState(false);
  const inputId = id || props.name || "password";

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-xs font-medium text-gray-500">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          ref={ref}
          id={inputId}
          type={visible ? "text" : "password"}
          className={cn(
            "h-11 w-full rounded-xl border border-gray-200 bg-white px-3.5 pr-11 text-sm font-medium text-ink placeholder:font-normal placeholder:text-gray-400 transition-colors duration-200 hover:border-brand-300 focus:border-brand-400 focus:outline-none",
            error && "border-ink focus:border-ink",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-3 flex h-6 w-6 items-center justify-center text-gray-400 transition-colors duration-200 hover:text-brand-600"
        >
          {visible ? <EyeOff className="h-4 w-4" strokeWidth={2} /> : <Eye className="h-4 w-4" strokeWidth={2} />}
        </button>
      </div>
      {error && (
        <span id={`${inputId}-error`} className="flex items-center gap-1 text-xs font-medium text-ink">
          <AlertCircle className="h-3 w-3 shrink-0" strokeWidth={2} />
          {error}
        </span>
      )}
    </div>
  );
});
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
