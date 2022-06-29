import React from "react";
import MySelect from "./UI/Select/MySelect";
import MyInput from "./UI/Input/MyInput";

export default function PostFilter({ filter, setFilter }) {
  return (
    <div>
      <MyInput
        value={filter.query}
        onChange={(e) => setFilter({ ...filter, query: e.target.value })}
      />
      <MySelect
        value={filter.sort}
        onChange={(selectedSort) =>
          setFilter({ ...filter, sort: selectedSort })
        }
        defaultValue="сортировка"
        options={[
          { value: "title", name: "по названию" },
          { value: "body", name: "по описанию" },
        ]}
      ></MySelect>
    </div>
  );
}
