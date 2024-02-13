import { Mask, Path, Svg } from "react-native-svg";

export interface IconProps {
  color?: string;
  iconWidth?: number;
  iconHeight?: number;
}

export const AppIcon = ({ color, iconWidth, iconHeight }: IconProps) => {
  return (
    <Svg
      width={iconWidth ?? 12}
      height={iconHeight ?? 12}
      viewBox="0 0 12 12"
      fill="none"
    >
      <Path
        d="M11.667 3.803V1.155C11.667 0.332 11.294 0 10.367 0H8.009C7.081 0 6.708 0.332 6.708 1.155V3.797C6.708 4.626 7.081 4.952 8.008 4.952H10.365C11.293 4.958 11.666 4.626 11.666 3.803H11.667ZM11.667 10.366V8.008C11.667 7.08 11.294 6.707 10.367 6.707H8.009C7.081 6.707 6.708 7.08 6.708 8.007V10.364C6.708 11.292 7.081 11.665 8.008 11.665H10.365C11.293 11.665 11.666 11.292 11.666 10.365L11.667 10.366ZM4.959 3.803V1.155C4.959 0.332 4.586 0 3.659 0H1.301C0.373 0 0 0.332 0 1.155V3.797C0 4.626 0.373 4.952 1.3 4.952H3.657C4.585 4.958 4.959 4.626 4.959 3.803ZM4.959 10.366V8.008C4.959 7.08 4.586 6.707 3.659 6.707H1.301C0.373 6.707 0 7.08 0 8.007V10.364C0 11.292 0.373 11.665 1.3 11.665H3.657C4.585 11.665 4.958 11.292 4.958 10.365L4.959 10.366Z"
        fill={color ?? "white"}
      />
    </Svg>
  );
};

export const SearchIcon = ({ color, iconWidth, iconHeight }: IconProps) => {
  return (
    <Svg
      width={iconWidth ?? 17}
      height={iconHeight ?? 17}
      viewBox="0 0 17 17"
      fill="none"
    >
      <Path
        d="M7.82802 15.8335C8.87512 15.8453 9.91415 15.6492 10.8849 15.2566C11.8557 14.8641 12.739 14.2828 13.4836 13.5465C14.2282 12.8103 14.8194 11.9336 15.2228 10.9672C15.6263 10.0009 15.834 8.96416 15.834 7.917C15.834 6.86984 15.6263 5.83308 15.2228 4.86676C14.8194 3.90043 14.2282 3.02375 13.4836 2.28747C12.739 1.55118 11.8557 0.969931 10.8849 0.577368C9.91415 0.184805 8.87512 -0.0112686 7.82802 0.00050004C5.74385 0.0239248 3.75299 0.868296 2.28747 2.35038C0.821943 3.83247 0 5.83269 0 7.917C0 10.0013 0.821943 12.0015 2.28747 13.4836C3.75299 14.9657 5.74385 15.8101 7.82802 15.8335ZM15.994 16.6665C15.8415 16.667 15.6949 16.6073 15.586 16.5005L14.036 14.9505C13.928 14.8404 13.8675 14.6923 13.8675 14.538C13.8675 14.3837 13.928 14.2356 14.036 14.1255C14.1461 14.0175 14.2943 13.9569 14.4485 13.9569C14.6028 13.9569 14.7509 14.0175 14.861 14.1255L16.411 15.6755C16.5191 15.7856 16.5796 15.9337 16.5796 16.088C16.5796 16.2423 16.5191 16.3904 16.411 16.5005C16.2978 16.6063 16.149 16.6656 15.994 16.6665Z"
        fill={color ?? "white"}
      />
    </Svg>
  );
};

export const PlusIcon = ({ color, iconWidth, iconHeight }: IconProps) => {
  return (
    <Svg
      width={iconWidth ?? 20}
      height={iconHeight ?? 20}
      viewBox="0 0 20 20"
      fill="none"
    >
      <Path
        d="M18.4062 8.33333H11.6667V1.59375C11.6667 0.713542 10.9219 0 10 0C9.07812 0 8.33333 0.713542 8.33333 1.59375V8.33333H1.59375C0.713542 8.33333 0 9.07812 0 10C0 10.9219 0.713542 11.6667 1.59375 11.6667H8.33333V18.4062C8.33333 19.2865 9.07812 20 10 20C10.9219 20 11.6667 19.2865 11.6667 18.4062V11.6667H18.4062C19.2865 11.6667 20 10.9219 20 10C20 9.07812 19.2865 8.33333 18.4062 8.33333Z"
        fill={color ?? "white"}
      />
    </Svg>
  );
};

export const StarIcon = ({ color, iconWidth, iconHeight }: IconProps) => {
  return (
    <Svg
      width={iconWidth ?? 17}
      height={iconHeight ?? 17}
      viewBox="0 0 17 17"
      fill="none"
    >
      <Path
        d="M9.77415 1.194L11.2412 4.127C11.4412 4.535 11.9742 4.927 12.4242 5.002L15.0832 5.444C16.7832 5.727 17.1832 6.96 15.9582 8.177L13.8912 10.244C13.5412 10.594 13.3492 11.269 13.4572 11.752L14.0492 14.31C14.5162 16.335 13.4412 17.119 11.6492 16.06L9.15715 14.585C8.70715 14.319 7.96615 14.319 7.50715 14.585L5.01615 16.06C3.23215 17.119 2.14915 16.327 2.61615 14.31L3.20715 11.752C3.31615 11.269 3.12415 10.594 2.77415 10.244L0.707154 8.177C-0.508846 6.96 -0.117846 5.727 1.58215 5.444L4.24115 5.002C4.68215 4.927 5.21615 4.535 5.41615 4.127L6.88215 1.194C7.68215 -0.398 8.98215 -0.398 9.77415 1.194Z"
        fill={color ?? "white"}
      />
    </Svg>
  );
};

export const HomeIcon = ({ color, iconWidth, iconHeight }: IconProps) => {
  return (
    <Svg
      width={iconWidth ?? 21}
      height={iconHeight ?? 20}
      viewBox="0 0 21 20"
      fill="none"
    >
      <Path
        d="M18.9999 6.01002L12.4499 0.770018C11.1699 -0.249982 9.16988 -0.259982 7.89988 0.760018L1.34988 6.01002C0.409885 6.76002 -0.160115 8.26002 0.0398848 9.44002L1.29988 16.98C1.58988 18.67 3.15988 20 4.86988 20H15.4699C17.1599 20 18.7599 18.64 19.0499 16.97L20.3099 9.43002C20.4899 8.26002 19.9199 6.76002 18.9999 6.01002ZM10.9199 16C10.9199 16.41 10.5799 16.75 10.1699 16.75C9.75988 16.75 9.41988 16.41 9.41988 16V13C9.41988 12.59 9.75988 12.25 10.1699 12.25C10.5799 12.25 10.9199 12.59 10.9199 13V16Z"
        fill={color ?? "white"}
      />
    </Svg>
  );
};

export const BellIcon = ({ color, iconWidth, iconHeight }: IconProps) => {
  return (
    <Svg
      width={iconWidth ?? 16}
      height={iconHeight ?? 20}
      viewBox="0 0 16 20"
      fill="none"
    >
      <Path
        d="M15.0294 12.4902L14.0294 10.8302C13.8194 10.4602 13.6294 9.76016 13.6294 9.35016V6.82016C13.6282 5.70419 13.3111 4.61137 12.7147 3.66813C12.1183 2.72489 11.267 1.96978 10.2594 1.49016C10.0022 1.0335 9.62709 0.654303 9.17324 0.392195C8.71939 0.130087 8.20347 -0.00530784 7.6794 0.000159243C6.5894 0.000159243 5.6094 0.590159 5.0894 1.52016C3.1394 2.49016 1.7894 4.50016 1.7894 6.82016V9.35016C1.7894 9.76016 1.5994 10.4602 1.3894 10.8202L0.379396 12.4902C-0.0206039 13.1602 -0.110604 13.9002 0.139396 14.5802C0.379396 15.2502 0.949396 15.7702 1.6894 16.0202C3.6294 16.6802 5.6694 17.0002 7.7094 17.0002C9.7494 17.0002 11.7894 16.6802 13.7294 16.0302C14.4294 15.8002 14.9694 15.2702 15.2294 14.5802C15.4894 13.8902 15.4194 13.1302 15.0294 12.4902ZM10.5194 18.0102C10.3091 18.5923 9.92467 19.0956 9.41835 19.4516C8.91203 19.8077 8.30837 19.9992 7.6894 20.0002C6.8994 20.0002 6.1194 19.6802 5.5694 19.1102C5.2494 18.8102 5.0094 18.4102 4.8694 18.0002C4.9994 18.0202 5.1294 18.0302 5.2694 18.0502C5.4994 18.0802 5.7394 18.1102 5.9794 18.1302C6.5494 18.1802 7.1294 18.2102 7.7094 18.2102C8.2794 18.2102 8.8494 18.1802 9.4094 18.1302C9.6194 18.1102 9.8294 18.1002 10.0294 18.0702L10.5194 18.0102Z"
        fill={color ?? "white"}
      />
    </Svg>
  );
};

export const CartIcon = ({ color, iconWidth, iconHeight }: IconProps) => {
  return (
    <Svg
      width={iconWidth ?? 18}
      height={iconHeight ?? 20}
      viewBox="0 0 18 20"
      fill="none"
    >
      <Path
        d="M16.8035 6.96427C16.1335 6.22427 15.1235 5.79427 13.7235 5.64427V4.88427C13.7235 3.51427 13.1435 2.19427 12.1235 1.27427C11.6202 0.812823 11.025 0.462927 10.3771 0.247511C9.72909 0.032095 9.04292 -0.0439787 8.3635 0.0242742C5.9735 0.254274 3.9635 2.56427 3.9635 5.06427V5.64427C2.5635 5.79427 1.5535 6.22427 0.883496 6.96427C-0.0865043 8.04427 -0.0565042 9.48427 0.0534958 10.4843L0.753496 16.0543C0.963496 18.0043 1.7535 20.0043 6.0535 20.0043H11.6335C15.9335 20.0043 16.7235 18.0043 16.9335 16.0643L17.6335 10.4743C17.7435 9.48427 17.7635 8.04427 16.8035 6.96427ZM8.5035 1.41427C8.98813 1.36559 9.47758 1.41913 9.94023 1.57143C10.4029 1.72372 10.8284 1.97138 11.1894 2.29841C11.5503 2.62544 11.8387 3.02456 12.0357 3.46998C12.2328 3.91539 12.3343 4.39721 12.3335 4.88427V5.58427H5.3535V5.06427C5.3535 3.28427 6.8235 1.57427 8.5035 1.41427ZM5.2635 11.1543H5.2535C4.7035 11.1543 4.2535 10.7043 4.2535 10.1543C4.2535 9.60427 4.7035 9.15427 5.2535 9.15427C5.8135 9.15427 6.2635 9.60427 6.2635 10.1543C6.2635 10.7043 5.8135 11.1543 5.2635 11.1543ZM12.2635 11.1543H12.2535C11.7035 11.1543 11.2535 10.7043 11.2535 10.1543C11.2535 9.60427 11.7035 9.15427 12.2535 9.15427C12.8135 9.15427 13.2635 9.60427 13.2635 10.1543C13.2635 10.7043 12.8135 11.1543 12.2635 11.1543Z"
        fill={color ?? "white"}
      />
    </Svg>
  );
};

export const HeartIcon = ({ color, iconWidth, iconHeight }: IconProps) => {
  return (
    <Svg
      width={iconWidth ?? 20}
      height={iconHeight ?? 18}
      viewBox="0 0 20 18"
      fill="none"
    >
      <Path
        d="M14.44 0C12.63 0 11.01 0.88 10 2.23C9.48413 1.53881 8.81426 0.977391 8.04353 0.590295C7.27281 0.203198 6.42247 0.00108555 5.56 0C2.49 0 0 2.5 0 5.59C0 6.78 0.19 7.88 0.52 8.9C2.1 13.9 6.97 16.89 9.38 17.71C9.72 17.83 10.28 17.83 10.62 17.71C13.03 16.89 17.9 13.9 19.48 8.9C19.81 7.88 20 6.78 20 5.59C20 2.5 17.51 0 14.44 0Z"
        fill={color ?? "white"}
      />
    </Svg>
  );
};

export const BeanIcon = ({ color, iconWidth, iconHeight }: IconProps) => {
  return (
    <Svg
      width={iconWidth ?? 20}
      height={iconHeight ?? 25}
      viewBox="0 0 20 25"
      fill="none"
    >
      <Path
        d="M9.912 24.381C12.27 20.801 11.92 15.911 8.733 12.723C6.768 10.759 5.72 8.226 5.72 5.432C5.72 3.772 6.157 2.113 6.9 0.671997C2.97 1.982 0 6.698 0 12.374C0 19.011 4.105 24.424 9.082 24.424C9.344 24.425 9.606 24.425 9.912 24.381Z"
        fill={color ?? "white"}
      />
      <Path
        d="M9.96432 0C9.70232 0 8.77032 0.15 8.46432 0.194C6.10632 3.774 7.12632 8.514 10.3143 11.702C12.2793 13.667 13.3263 16.199 13.3263 18.994C13.3263 20.653 12.4253 21.894 11.6833 23.334C15.6133 22.024 19.0463 17.727 19.0463 12.051C19.0463 5.415 14.9863 -0.044 9.96432 0Z"
        fill={color ?? "white"}
      />
    </Svg>
  );
};

export const BeansIcon = ({ color, iconWidth, iconHeight }: IconProps) => {
  return (
    <Svg
      width={iconWidth ?? 40}
      height={iconHeight ?? 30}
      viewBox="0 0 40 30"
      fill="none"
    >
      <Path
        d="M31.1655 4.40013C30.9386 4.26913 30.0565 3.93303 29.7695 3.81814C25.9374 5.73951 24.4508 10.3545 25.6176 14.7094C26.3369 17.3936 25.9776 20.1099 24.5801 22.5304C23.7506 23.9672 22.3498 24.5914 20.9872 25.4675C25.0457 26.298 30.1673 24.2932 33.0053 19.3776C36.3233 13.6307 35.5367 6.87303 31.1655 4.40013Z"
        fill={color ?? "white"}
      />
      <Path
        d="M18.9297 25.4886C22.7618 23.5672 24.9037 19.1574 23.7377 14.803C23.018 12.1196 23.3769 9.40196 24.7739 6.98228C25.6039 5.54468 26.8118 4.32644 28.1758 3.45C24.1173 2.61949 19.1872 5.21867 16.3492 10.1342C13.0307 15.882 13.8792 22.6223 18.1894 25.1108C18.4158 25.2427 18.6427 25.3737 18.9297 25.4886Z"
        fill={color ?? "white"}
      />
      <Path
        d="M5.66942 10.6689C5.83298 10.5602 6.47088 10.2698 6.67836 10.1711C9.48841 11.4911 10.6231 14.9575 9.82437 18.327C9.33203 20.4039 9.62469 22.464 10.6693 24.2584C11.2893 25.3235 12.3156 25.7464 13.317 26.363C10.3739 27.1527 6.62481 25.8183 4.50349 22.1742C2.02338 17.9138 2.51778 12.7244 5.66942 10.6689Z"
        fill={color ?? "white"}
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.1267 25.3521C15.8886 25.5861 15.6293 25.7976 15.3491 25.9839C15.1859 26.0932 15.0223 26.2019 14.8148 26.3006C12.0048 24.9806 10.3957 21.6959 11.1939 18.3268C11.6866 16.2505 11.3942 14.1895 10.3499 12.3957C9.72954 11.3299 8.8367 10.4461 7.8343 9.82926C9.80978 9.29924 12.0888 9.93393 14.0153 11.5106C12.0173 16.9135 12.8888 22.5934 16.1267 25.3521Z"
        fill={color ?? "white"}
      />
    </Svg>
  );
};

export const LocationIcon = ({ color, iconWidth, iconHeight }: IconProps) => {
  return (
    <Svg
      width={iconWidth ?? 18}
      height={iconHeight ?? 21}
      viewBox="0 0 18 21"
      fill="none"
    >
      <Path
        d="M17.5 6.7C16.45 2.08 12.42 0 8.87998 0C8.87998 0 8.87998 0 8.86998 0C5.33998 0 1.29998 2.07 0.249978 6.69C-0.920022 11.85 2.23998 16.22 5.09998 18.97C6.15998 19.99 7.51998 20.5 8.87998 20.5C10.24 20.5 11.6 19.99 12.65 18.97C15.51 16.22 18.67 11.86 17.5 6.7ZM8.87998 11.71C7.13998 11.71 5.72998 10.3 5.72998 8.56C5.72998 6.82 7.13998 5.41 8.87998 5.41C10.62 5.41 12.03 6.82 12.03 8.56C12.03 10.3 10.62 11.71 8.87998 11.71Z"
        fill={color ?? "white"}
      />
    </Svg>
  );
};

export const ChevronLeftIcon = ({
  color,
  iconWidth,
  iconHeight,
}: IconProps) => {
  return (
    <Svg
      width={iconWidth ?? 12}
      height={iconHeight ?? 20}
      viewBox="0 0 12 20"
      fill="none"
    >
      <Path
        d="M10.883 17.7735C11.3922 18.2823 11.3925 19.1088 10.883 19.6181C10.3742 20.1274 9.54799 20.1272 9.0384 19.6181C9.0354 19.6151 9.03315 19.6121 9.03045 19.6089L9.02671 19.6122L0.387177 10.9727L0.390773 10.9694C0.266855 10.8483 0.168439 10.7036 0.101325 10.5438C0.0342123 10.3841 -0.000239639 10.2125 1.25459e-06 10.0392C-0.000242883 9.84492 0.0430963 9.65303 0.126828 9.47768C0.210559 9.30234 0.33255 9.148 0.483821 9.02604L0.474831 9.01735L9.11436 0.377821L9.11811 0.381418C9.12081 0.378271 9.12305 0.375574 9.12605 0.372727C9.37151 0.132211 9.70197 -0.00172571 10.0456 1.67917e-05C10.3893 0.0017593 10.7184 0.139041 10.9614 0.382033C11.2044 0.625026 11.3417 0.954098 11.3435 1.29775C11.3452 1.6414 11.2113 1.97187 10.9708 2.21736C10.9677 2.22035 10.9647 2.22245 10.9617 2.22545L10.9651 2.22904L3.15584 10.0392L10.8784 17.7618L10.8746 17.7649C10.8769 17.7682 10.88 17.7703 10.883 17.7735Z"
        fill={color ?? "white"}
      />
    </Svg>
  );
};

export const MinusIcon = ({ color, iconWidth, iconHeight }: IconProps) => {
  return (
    <Svg
      width={iconWidth ?? 20}
      height={iconHeight ?? 4}
      viewBox="0 0 20 4"
      fill="none"
    >
      <Path
        d="M18.4062 0H1.59375C0.713542 0 0 0.744792 0 1.66667C0 2.58854 0.713542 3.33333 1.59375 3.33333H18.4062C19.2865 3.33333 20 2.58854 20 1.66667C20 0.744792 19.2865 0 18.4062 0Z"
        fill={color ?? "white"}
      />
    </Svg>
  );
};

export const CreditCardChipIcon = ({
  color,
  iconWidth,
  iconHeight,
}: IconProps) => {
  return (
    <Svg
      width={iconWidth ?? 20}
      height={iconHeight ?? 16}
      viewBox="0 0 20 16"
      fill="none"
    >
      <Path
        d="M12.5924 10.7595C12.5924 11.0103 12.3831 11.217 12.1292 11.217H7.87082C7.61693 11.217 7.40757 11.0103 7.40757 10.7595V8.82405V6.65982V4.72434C7.40757 4.47361 7.61693 4.26686 7.87082 4.26686H12.1292C12.3831 4.26686 12.5924 4.46921 12.5924 4.72434V6.65982V8.82405V10.7595ZM6.44098 4.71994V6.65542C6.44098 6.98094 6.22717 7.25806 5.97773 7.25806H0V3.10997C0 3.08358 0.00445462 3.06158 0.00445462 3.03519H5.97773C6.22717 3.03519 6.44098 3.31232 6.44098 3.63783V4.71994ZM0 12.3695V8.22141H5.97773C6.22717 8.22141 6.44098 8.49853 6.44098 8.82405V10.7595V11.8416C6.44098 12.1672 6.22717 12.4443 5.97773 12.4443H0.00445462C0.00445462 12.4179 0 12.3959 0 12.3695ZM20 3.10997V7.25806H14.0223C13.7728 7.25806 13.559 6.98094 13.559 6.65542V4.71994V3.63783C13.559 3.31232 13.7728 3.03519 14.0223 3.03519H19.9955C19.9955 3.06158 20 3.08798 20 3.10997ZM13.5635 10.7595V8.82405C13.5635 8.49853 13.7773 8.22141 14.0267 8.22141H20V12.3695C20 12.3959 19.9955 12.4179 19.9955 12.4443H14.0223C13.7728 12.4443 13.559 12.1672 13.559 11.8416V10.7595H13.5635ZM3.15368 0H16.8463C18.2183 0 19.3853 0.870967 19.8174 2.08064H14.0223C13.3096 2.08064 12.7216 2.65249 12.6102 3.39589C12.4588 3.34311 12.2984 3.30792 12.1247 3.30792H7.86637C7.6971 3.30792 7.53229 3.34311 7.38085 3.39589C7.2784 2.65249 6.69042 2.08064 5.97773 2.08064H0.182628C0.6147 0.870967 1.78174 0 3.15368 0ZM16.8463 15.4839H3.15368C1.78174 15.4839 0.6147 14.6129 0.182628 13.4032H5.97773C6.69042 13.4032 7.2784 12.8314 7.38976 12.088C7.5412 12.1408 7.70156 12.176 7.87528 12.176H12.1336C12.3029 12.176 12.4677 12.1408 12.6192 12.088C12.7261 12.8314 13.314 13.4032 14.0312 13.4032H19.8263C19.3853 14.6129 18.2183 15.4839 16.8463 15.4839Z"
        fill={color ?? "white"}
      />
    </Svg>
  );
};

export const VisaIcon = ({ color, iconWidth, iconHeight }: IconProps) => {
  return (
    <Svg
      width={iconWidth ?? 20}
      height={iconHeight ?? 7}
      viewBox="0 0 20 7"
      fill="none"
    >
      <Path
        d="M10.3435 2.06474C10.3321 2.96439 11.1453 3.46646 11.7579 3.76494C12.3872 4.07123 12.5986 4.26761 12.5962 4.54147C12.5914 4.96066 12.0942 5.14564 11.6287 5.15284C10.8168 5.16545 10.3447 4.93364 9.96937 4.75827L9.6769 6.12696C10.0535 6.30052 10.7507 6.45186 11.4738 6.45847C13.171 6.45847 14.2814 5.62068 14.2874 4.32166C14.294 2.67311 12.0071 2.58183 12.0227 1.84493C12.0281 1.62152 12.2413 1.3831 12.7085 1.32244C12.9398 1.29181 13.5782 1.26839 14.3018 1.6017L14.5859 0.277459C14.1967 0.135726 13.6965 -1.43051e-06 13.0737 -1.43051e-06C11.4762 -1.43051e-06 10.3525 0.849196 10.3435 2.06474ZM17.3155 0.114106C17.0056 0.114106 16.7443 0.294876 16.6278 0.572337L14.2034 6.36118H15.8993L16.2369 5.4285H18.3094L18.5052 6.36118H20L18.6956 0.114106H17.3155ZM17.5527 1.80169L18.0422 4.1475H16.7017L17.5527 1.80169ZM8.28719 0.114106L6.95033 6.36118H8.56645L9.90271 0.114106H8.28719ZM5.89634 0.114106L4.21416 4.3661L3.53372 0.750704C3.45385 0.347125 3.13855 0.114106 2.78842 0.114106H0.0384361L0 0.295476C0.564531 0.417991 1.20593 0.615577 1.5945 0.826976C1.83232 0.956098 1.90019 1.069 1.97826 1.37589L3.26707 6.36118H4.97508L7.59354 0.114106H5.89634Z"
        fill={color ?? "white"}
      />
    </Svg>
  );
};

export const WalletIcon = ({ color, iconWidth, iconHeight }: IconProps) => {
  return (
    <Svg
      width={iconWidth ?? 20}
      height={iconHeight ?? 16}
      viewBox="0 0 20 16"
      fill="none"
    >
      <Path
        d="M19 0H1C0.4 0 0 0.4 0 1V15C0 15.6 0.4 16 1 16H19C19.6 16 20 15.6 20 15V10H13C11.9 10 11 9.1 11 8C11 6.9 11.9 6 13 6H20V1C20 0.4 19.6 0 19 0Z"
        fill={color ?? "white"}
      />
      <Path
        d="M13 9C13.5523 9 14 8.55228 14 8C14 7.44772 13.5523 7 13 7C12.4477 7 12 7.44772 12 8C12 8.55228 12.4477 9 13 9Z"
        fill={color ?? "white"}
      />
    </Svg>
  );
};

export const AppleIcon = ({ color, iconWidth, iconHeight }: IconProps) => {
  return (
    <Svg
      width={iconWidth ?? 21}
      height={iconHeight ?? 25}
      viewBox="0 0 21 25"
      fill="none"
    >
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.4046 13.2821C17.3725 10.1173 20.0467 8.59856 20.1661 8.52337C18.6631 6.37534 16.3213 6.08008 15.4869 6.04688C13.4942 5.85033 11.5991 7.19376 10.5867 7.19376C9.57706 7.19376 8.01686 6.07637 6.36458 6.10594C4.19283 6.13731 2.19059 7.34 1.07102 9.24031C-1.18529 13.0648 0.493895 18.7333 2.69307 21.8346C3.76735 23.3533 5.04849 25.0593 6.731 24.9984C8.35069 24.9361 8.96364 23.9733 10.9229 23.9733C12.8817 23.9733 13.4318 24.9985 15.1464 24.9657C16.8898 24.9343 17.9943 23.4174 19.0616 21.8936C20.2964 20.1312 20.8026 18.427 20.8333 18.3394C20.7946 18.3223 17.4338 17.0647 17.3998 13.2835L17.4046 13.2821H17.4046ZM14.1841 3.99201C15.0766 2.93415 15.6796 1.46569 15.5148 0C14.2289 0.0512077 12.6696 0.83733 11.7465 1.89382C10.9177 2.83173 10.1938 4.32648 10.3874 5.76217C11.8235 5.87154 13.2897 5.04941 14.1826 3.99385L14.1841 3.99201Z"
        fill={color ?? "white"}
      />
    </Svg>
  );
};

export const GooglePayIcon = ({ color, iconWidth, iconHeight }: IconProps) => {
  return <></>;
};
