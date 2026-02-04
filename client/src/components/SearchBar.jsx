import { api } from "../api";

export default function SearchBar({ setMessages }) {
  const search = async e => {
    const q = e.target.value;
    if (!q) return;

    const res = await api.get(`/search?q=${q}`);
    setMessages(res.data);
  };

  return (
    <input
      placeholder="Search conversation..."
      onChange={search}
    />
  );
}
