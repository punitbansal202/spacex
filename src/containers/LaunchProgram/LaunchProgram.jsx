import React from 'react';
import LaunchFilters from './LaunchFilters';
import LauchList from '../LaunchList/LaunchList';
import './LaunchProgram.css';
import FilterCategory from './FilterCategory';


export default class LaunchProgram extends React.Component {

    state = {
        filterData: [{
            type: "launch_year",
            displayName: "Launch Year",
            data: new Array((new Date().getFullYear() - 2005)).fill().map((a, i) => 2006 + i),
            activeItem: this.props.query["launch_year"] && parseInt(this.props.query["launch_year"])
        },
        {
            type: "launch_success",
            displayName: "Successful Launch",
            data: ["true", "false"],
            activeItem: this.props.query["launch_success"]
        },
        {
            type: "land_success",
            displayName: "Successful Landing",
            data: ["true", "false"],
            activeItem: this.props.query["land_success"]
        }],
        queryString: "qury",
        dataLimit: 50
    }

    componentDidMount() {
        this.props.fetchLaunchData(`?limit=${this.state.dataLimit}${this.state.queryString && "&" + this.state.queryString}`);
    }

    componentDidUpdate(prevProps, prevState) {
        if ((prevState.queryString !== this.state.queryString) || (prevState.dataLimit !== this.state.dataLimit)) {
            this.props.fetchLaunchData(`?limit=${this.state.dataLimit}${this.state.queryString && "&" + this.state.queryString}`);
        }
    }

    fetchMoreData = () => {
        this.setState((prevState) => {
            return {
                dataLimit: prevState.dataLimit + 50
            }
        })
    }

    onFilterApply = (category, value) => {
        const currentQueries = "qury";
        const currentCategory = { ...this.state.filterData.find(filterCategory => filterCategory.type === category) };

        if (currentCategory.activeItem && currentCategory.activeItem === value) {
            currentQueries[category] = null;
            currentCategory.activeItem = null;
        }
        else {
            currentCategory.activeItem = value;
            currentQueries[category] = value;
        }
        const queryString = "qury";

        this.props.history.push("?" + queryString);
        this.setState(prevState => {
            return {
                filterData: prevState.filterData.map(filterCategory => filterCategory.type === category ? currentCategory : filterCategory),
                queryString: queryString
            }
        })
    }

    render() {
        let launchList = <div></div>;

        if (this.props.launchProgram.success) {
            launchList =
                <LauchList
                    launchData={this.props.launchProgram.launchData}
                    dataLimit={this.state.dataLimit}
                    fetchMoreData={this.fetchMoreData} />
        }
        else if (this.props.launchProgram.error) {
            launchList = <div className="no-data"><h2>Error occurred while fetching data</h2></div>
        }

        return <>
        <div className="launch-filters">
            <h2>Filters</h2>
            {this.props.filterData.map(category =>
            <FilterCategory
            filterValues={category.data}
            filerType={category.type}
            key={category.type}
            filterDisplayName={category.displayName}
            activeItem={category.activeItem}
            onFilterApply={this.props.onFilterApply} />
            )}
        </div>
        <LaunchFilters filterData={this.state.filterData} onFilterApply={this.onFilterApply} />
        {launchList}
        {this.props.launchProgram.loading}
        </>
    }
}
