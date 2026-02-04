import { Link } from "react-router-dom";
import Header from "../Header";

export type PageLayoutHeaderVariant = "default" | "simple";

interface PageLayoutProps {
  children: React.ReactNode;
  /** Optional page title shown above main content (e.g. "Start an Order") */
  title?: string;
  /** Additional class for the main content wrapper */
  className?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  className = "",
}) => {
  return (
    <div className="flex items-center flex-col min-h-screen w-full bg-white">
      <main
        className={`flex w-full items-center justify-center bg-white px-4 md:px-8 ${className}`.trim()}
      >
        <div className="flex flex-col items-center justify-center w-full">
          {title && (
            <h1 className="text-2xl md:text-5xl font-extrabold text-black w-full mb-10">
              {title}
            </h1>
          )}
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageLayout;
