import React from 'react';

const FilterCategory = (props) => {

    const onFilterClick = (value) => {
        props.onFilterApply(props.filerType, value);
    }

    const filterItems = props.filterValues.map((filter) =>
    <button className={"filter-item" + (filter === props.activeItem ? " active" : "")}
    onClick={() => { onFilterClick(filter) }}>
    {filter}
</button>
    )

    return (
        <section className="filter-category">
            <h3 className="filter-type">{props.filterDisplayName}</h3>
            <div className="filter-values">
                {filterItems}
            </div>
        </section>
    );
}

export default FilterCategory;