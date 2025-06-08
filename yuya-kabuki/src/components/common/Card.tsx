"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

interface CardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  href?: string;
  color?: string;
  stats?: {
    label: string;
    value: string;
  };
  onClick?: () => void;
  isSelected?: boolean;
  className?: string;
  children?: ReactNode;
  variants?: Variants;
}

export const Card = ({
  title,
  description,
  icon,
  href,
  color = "from-vampire-accent to-purple-600",
  stats,
  onClick,
  isSelected,
  className = "",
  children,
  variants,
}: CardProps) => {
  const cardContent = (
    <>
      {/* 背景グラデーション */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
      ></div>

      {/* アイコン */}
      {icon && (
        <div className={`inline-flex p-4 rounded-lg bg-gradient-to-br ${color} text-white mb-4`}>
          {icon}
        </div>
      )}

      {/* コンテンツ */}
      <h3 className="text-2xl font-bold mb-2 group-hover:gradient-text transition-all duration-300">
        {title}
      </h3>
      {description && <p className="text-text-secondary mb-4">{description}</p>}

      {/* 統計情報 */}
      {stats && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">{stats.label}</span>
          <span className={`font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
            {stats.value}
          </span>
        </div>
      )}

      {/* 子要素 */}
      {children}

      {/* ホバーエフェクト */}
      {href && (
        <div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            backgroundImage: `linear-gradient(to right, ${color.split(" ")[1].replace("to-", "")}, ${
              color.split(" ")[2]
            })`,
          }}
        ></div>
      )}
    </>
  );

  const cardClasses = `group relative overflow-hidden rounded-2xl bg-vampire-shadow/30 border p-8 transition-all duration-300 ${
    isSelected
      ? "border-vampire-accent bg-vampire-accent/10"
      : "border-vampire-accent/10 hover:border-vampire-accent/30 hover:shadow-xl hover:shadow-vampire-accent/20"
  } ${className}`;

  if (href) {
    return (
      <motion.div variants={variants}>
        <Link href={href}>
          <div className={cardClasses}>{cardContent}</div>
        </Link>
      </motion.div>
    );
  }

  if (onClick) {
    return (
      <motion.button
        variants={variants}
        onClick={onClick}
        className={`${cardClasses} text-left w-full`}
      >
        {cardContent}
      </motion.button>
    );
  }

  return (
    <motion.div variants={variants} className={cardClasses}>
      {cardContent}
    </motion.div>
  );
}; 