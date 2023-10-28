import { useState } from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { useSearchParams } from 'react-router-dom';
import { useItems } from '../services/thunks/ActionCreators';
import CollapsibleList from './CollapsibleList';
// import FilterToggle from './FilterToggle';

export default function ColorFilters() {
  const [search, setSearch] = useSearchParams();
  const filteredColors = search.get('colors')?.split(',') ?? [];
  const [colors, setColors] = useState(filteredColors);

 
  const allColors = ['male','female']

  const groupedItems = allColors.map((color) => ({
      label: color,
      name: color,
      value: color,
    }))
    // @ts-ignore
    .sort((a, b) => a.name.localeCompare(b.name));

  const onColorChange = (color: string) => (checked: Checkbox.CheckedState) => {
    let _colors = colors.slice();

    if (checked) {
      _colors.push(color);
    } else {
      _colors = _colors.filter((_color) => _color !== color);
    }

    setColors(_colors);
  };
  const hasFilters = filteredColors.length > 0;

  return (
    <CollapsibleList
      defaultVisible={hasFilters}
      title="Color"
      // actionButton={
      //   <FilterToggle
      //     visible={colors.length > 0}
      //     active={hasFilters}
      //    
      //     onClear={() => {
      //       search.delete('colors');
      //       setColors([]);
      //       setSearch(search, {
      //         replace: true,
      //       });
      //     }}
      //   />
      
    >
      {groupedItems
        .map((field:any, key) => (
          <li key={key} className="">
            <div className="">
              <input type="checkbox" 
              onChange={() => {
                      onColorChange(field.value)
                      search.set('colors', colors.join(','));
                      setSearch(search, {
                        replace: true,
                      });
                    }}
               id={field.name}
               name={field.name} 
              //  onChange={() => }
                // disabled={hasFilters}
                // checked={colors.includes(field.value)}
               value={field.name}
              />       
              <label htmlFor="">{field.name}</label>       
            </div>
          </li>
        ))}
    </CollapsibleList>
  );
}
