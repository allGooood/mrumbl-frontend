import TextInput from "../atom/TextInput";
import MagnifierIcon from "../icon/MagnifierIcon";
import ArrowRightIcon from "../icon/ArrowRightIcon";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search City, State, or Zipcode",
}) => {
  return (
    <div className="relative mb-6">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
        <MagnifierIcon />
      </span>
      <TextInput
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-10"
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
        <ArrowRightIcon />
      </span>
    </div>
  );
};

export default SearchBar;
