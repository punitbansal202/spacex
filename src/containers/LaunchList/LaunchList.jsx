import React from 'react';

class LauchList extends React.Component {

    state = {
        slicedIndex: 12,
    }
    lastElement = React.createRef(null);
    observer = null;

    componentDidMount() {
        if (this.state.slicedIndex < this.props.launchData.length) {
            this.createIntersectionObserver();
        }
    }
    componentDidUpdate() {
        if (this.state.slicedIndex < this.props.launchData.length && !this.observer) {
            this.createIntersectionObserver();
        }
        else if (this.state.slicedIndex >= this.props.dataLimit && this.props.launchData.length === this.props.dataLimit) {
            this.props.fetchMoreData()
        }
    }
    componentWillUnmount() {
        this.observer && this.observer.disconnect();
    }

    createIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const { isIntersecting } = entry;
                if (isIntersecting) {
                    if (this.state.slicedIndex < this.props.launchData.length) {
                        this.lastElement = React.createRef(null);
                        this.observer = this.observer.disconnect();
                        this.setState((prevState) => {
                            return {
                                slicedIndex: prevState.slicedIndex + 12
                            }
                        })
                    }
                }
            })
        },
            {
                rootMargin: '0px 0px 1000px 0px',
            });
        this.observer.observe(this.lastElement.current);
    }

    render() {
        let launchItems;
        if (this.props.launchData && this.props.launchData.length) {
            launchItems = this.props.launchData.slice(0, this.state.slicedIndex).map((data, i) => {
            return <div className="launch-item">
                        <figure className="figure-item"><img src={data.mission_patch_small} alt={data.mission_name} /></figure>
                        <p className="launch-name">{data.mission_name}  #{data.flight_number}</p>
                        
                        <div className={"launch-detail" + (Array.isArray(data.mission_id) ? " type-list" : "")}>
                        <p className="detail-label">Mission Ids</p>
                        {data.mission_id}
                        </div>
                        
                        <div className={"launch-detail" + (Array.isArray(data.launch_year) ? " type-list" : "")}>
                        <p className="detail-label">Launch Year</p>
                        {data.launch_year}
                        </div>
                        
                        <div className={"launch-detail" + (Array.isArray(data.launch_success) ? " type-list" : "")}>
                        <p className="detail-label">Successful Launch</p>
                        {data.launch_success}
                        </div>
                        
                        <div className={"launch-detail" + (Array.isArray(data.landing_success) ? " type-list" : "")}>
                        <p className="detail-label">Successful Landing</p>
                        {data.landing_success}
                        </div>
                    </div>
            })
        } else {
            launchItems = <div className="no-data"><h2>No data found</h2></div>
        }

        return (
            <div className="launch-list" >
                { launchItems}
            </div>
        );
    }
}

export default LauchList;