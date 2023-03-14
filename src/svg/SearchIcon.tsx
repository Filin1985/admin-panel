import { IIcon } from "./types"

export const SearchIcon: React.FC<IIcon> = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.5 15.5L20 19"
        stroke="#9EAAB4"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6 11C6 14.3137 8.68629 17 12 17C13.6597 17 15.1621 16.3261 16.2483 15.237C17.3308 14.1517 18 12.654 18 11C18 7.68629 15.3137 5 12 5C8.68629 5 6 7.68629 6 11Z"
        stroke="#9EAAB4"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
