import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";

// Callout Components (Server-safe)
function InfoBox({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <div className="my-6 rounded-xl border-2 border-blue-500 bg-blue-50 dark:bg-blue-950/50 p-6 shadow-lg">
      {title && (
        <div className="font-bold text-xl mb-3 text-blue-900 dark:text-blue-100 flex items-center gap-2">
          ℹ️ {title}
        </div>
      )}
      <div className="text-blue-900 dark:text-blue-100 leading-relaxed prose-p:my-2">
        {children}
      </div>
    </div>
  );
}

function WarningBox({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <div className="my-6 rounded-xl border-2 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/50 p-6 shadow-lg">
      {title && (
        <div className="font-bold text-xl mb-3 text-yellow-900 dark:text-yellow-100 flex items-center gap-2">
          ⚠️ {title}
        </div>
      )}
      <div className="text-yellow-900 dark:text-yellow-100 leading-relaxed prose-p:my-2">
        {children}
      </div>
    </div>
  );
}

function SuccessBox({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <div className="my-6 rounded-xl border-2 border-green-500 bg-green-50 dark:bg-green-950/50 p-6 shadow-lg">
      {title && (
        <div className="font-bold text-xl mb-3 text-green-900 dark:text-green-100 flex items-center gap-2">
          ✅ {title}
        </div>
      )}
      <div className="text-green-900 dark:text-green-100 leading-relaxed prose-p:my-2">
        {children}
      </div>
    </div>
  );
}

function ErrorBox({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <div className="my-6 rounded-xl border-2 border-red-500 bg-red-50 dark:bg-red-950/50 p-6 shadow-lg">
      {title && (
        <div className="font-bold text-xl mb-3 text-red-900 dark:text-red-100 flex items-center gap-2">
          ❌ {title}
        </div>
      )}
      <div className="text-red-900 dark:text-red-100 leading-relaxed prose-p:my-2">
        {children}
      </div>
    </div>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // Custom components
    InfoBox,
    WarningBox,
    SuccessBox,
    ErrorBox,

    // Code blocks - VERY VISIBLE styling
    pre: ({ children, ...props }) => {
      return (
        <div className="my-8 rounded-xl overflow-hidden border-4 border-gray-900 dark:border-gray-100 shadow-2xl">
          <div className="bg-gray-900 dark:bg-gray-950 px-4 py-2 border-b-4 border-gray-700 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
          </div>
          <pre
            className="!m-0 !bg-gray-950 dark:!bg-black p-6 overflow-x-auto !rounded-none text-sm leading-relaxed"
            {...props}
          >
            {children}
          </pre>
        </div>
      );
    },

    // Inline code - HIGHLY VISIBLE
    code: ({ children, className, ...props }) => {
      const isInline = !className;

      if (isInline) {
        return (
          <code
            className="px-2 py-1 mx-0.5 rounded-md bg-pink-100 dark:bg-pink-950 border-2 border-pink-300 dark:border-pink-700 text-sm font-mono font-bold text-pink-700 dark:text-pink-300 before:content-none after:content-none"
            {...props}
          >
            {children}
          </code>
        );
      }

      // Code inside pre blocks
      return (
        <code
          className={`${className} !text-green-400 dark:!text-green-300 font-mono`}
          {...props}
        >
          {children}
        </code>
      );
    },

    // Tables - Better visibility
    table: ({ children }) => (
      <div className="my-8 overflow-hidden rounded-xl border-4 border-gray-900 dark:border-gray-100 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white dark:bg-gray-950">
            {children}
          </table>
        </div>
      </div>
    ),

    thead: ({ children }) => (
      <thead className="bg-gray-900 dark:bg-black text-white">{children}</thead>
    ),

    tbody: ({ children }) => (
      <tbody className="divide-y-2 divide-gray-200 dark:divide-gray-800">
        {children}
      </tbody>
    ),

    tr: ({ children }) => (
      <tr className="hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
        {children}
      </tr>
    ),

    th: ({ children }) => (
      <th className="px-6 py-4 text-left text-sm font-black uppercase tracking-wider">
        {children}
      </th>
    ),

    td: ({ children }) => (
      <td className="px-6 py-4 text-sm font-medium">{children}</td>
    ),

    // Blockquotes - More visible
    blockquote: ({ children }) => (
      <blockquote className="border-l-8 border-gray-900 dark:border-gray-100 bg-gray-100 dark:bg-gray-900 pl-6 pr-6 py-4 my-8 italic text-gray-900 dark:text-gray-100 rounded-r-lg shadow-lg">
        {children}
      </blockquote>
    ),

    // Horizontal rule
    hr: () => (
      <hr className="my-12 border-t-4 border-gray-300 dark:border-gray-700 rounded" />
    ),

    // Lists
    ul: ({ children }) => (
      <ul className="my-6 list-disc pl-8 space-y-3 marker:text-gray-900 dark:marker:text-gray-100 marker:text-lg">
        {children}
      </ul>
    ),

    ol: ({ children }) => (
      <ol className="my-6 list-decimal pl-8 space-y-3 marker:text-gray-900 dark:marker:text-gray-100 marker:text-lg marker:font-bold">
        {children}
      </ol>
    ),

    li: ({ children }) => <li className="leading-7 pl-2">{children}</li>,

    // Headings - More visible
    h1: ({ children }) => (
      <h1 className="text-5xl font-black mb-8 mt-0 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
        {children}
      </h1>
    ),

    h2: ({ children }) => (
      <h2 className="text-4xl font-black mt-16 mb-6 pb-3 border-b-4 border-gray-900 dark:border-gray-100">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="text-3xl font-bold mt-12 mb-4 text-gray-900 dark:text-gray-100">
        {children}
      </h3>
    ),

    h4: ({ children }) => (
      <h4 className="text-2xl font-bold mt-8 mb-3 text-gray-900 dark:text-gray-100">
        {children}
      </h4>
    ),

    // Paragraphs
    p: ({ children }) => (
      <p className="text-base leading-8 mb-6 text-gray-800 dark:text-gray-200">
        {children}
      </p>
    ),

    // Strong emphasis
    strong: ({ children }) => (
      <strong className="font-black text-gray-900 dark:text-gray-100">
        {children}
      </strong>
    ),

    // Links
    a: ({ children, href, ...props }) => (
      <a
        href={href}
        className="text-blue-600 dark:text-blue-400 font-bold underline decoration-2 underline-offset-2 hover:decoration-4 transition-all"
        {...props}
      >
        {children}
      </a>
    ),
  };
}
