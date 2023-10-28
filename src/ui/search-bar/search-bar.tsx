import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RiSearch2Line } from 'react-icons/ri';

import { debounce } from "lodash";

export default function SearchBar() {
const [search, setSearch] = useSearchParams();

const onSearchChange = debounce((e: any) => {
  const text = e.target.value;

  if (text.length === 0) {
    search.delete('type');
    setSearch(search, {
      replace: true,
    });
  } else {
    search.set('type', text);
    setSearch(search, {
      replace: true,
    });
  }
}, 350);

return (
  <div>
    <button
      onChange={onSearchChange}
      value='lifestyle'
      id="search"
      name="search">лайфстайл</button>
  </div>
);
}