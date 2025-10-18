import { FC } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { ButtonProps } from "./types";

const Button: FC<ButtonProps> = ({
  title,
  type = "button",
  buttonStyle = "filled",
  collapseToIcon,
  collapseTextToIcon,
  showOnlyIcon,
  big,
  medium,
  small,
  className,
  Icon,
  ...props
}) => {
  const buttonSize = (() => {
    switch (true) {
      case small:
        return "small";
      case medium:
        return "medium";
      case big:
        return "big";
      default:
        return "big";
    }
  })();

  const applyСollapseToIconStyle = collapseToIcon && !!Icon;
  const applyCollapseTextToIconStyle = collapseTextToIcon && !!Icon;
  const applyShowOnlyIconStyle = showOnlyIcon && !!Icon;

  const customClassName = clsx(
    styles.button,
    styles[buttonStyle],
    {
      [styles.collaps_to_icon]: applyСollapseToIconStyle,
      [styles.btn_collaps_text_to_icon]: applyCollapseTextToIconStyle,
      [styles.btn_show_only_icon]: applyShowOnlyIconStyle,
      [styles[buttonSize]]: buttonSize,
      [styles[`${buttonSize}_btn_with_icon`]]: Icon && buttonSize,
    },
    className
  );
  const customIconClass = clsx({
    [styles[`${buttonSize}_icon`]]: buttonSize,
    [styles.icon_collaps_text_to_icon]: applyCollapseTextToIconStyle,
    [styles.icon_show_only_icon]: applyShowOnlyIconStyle,
  });
  return (
    <button className={customClassName} type={type} {...props}>
      {Icon ? <Icon className={customIconClass} /> : null}
      <span className={styles.title}>{title}</span>
    </button>
  );
};

export default Button;
