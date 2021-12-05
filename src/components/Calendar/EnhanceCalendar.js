import React from 'react'

/**
 * EnhanceCalendar to handle select state
 * @param WrapComponent
 * @param options  range: if select range
 * @constructor
 */
const EnhanceCalendar = (WrapComponent, options = {}) => {

	const {range = false} = options

	return class extends React.Component {
		constructor(props) {
			super(props)
			let startDate, endDate
			if (range && Array.isArray(props.defaultDate)) {
				// range date
				startDate = props.defaultDate[0]
				endDate = props.defaultDate[1]
			} else {
				startDate = props.defaultDate
			}
			this.state = {
				animating: false,
				startDate: startDate,
				endDate: endDate,
				hoveringDate: null
			}

			this.onDateChange = this.onDateChange.bind(this)
			this.onHoveringDateChange = this.onHoveringDateChange.bind(this)
		}

		/**
		 * hovering day item
		 * @param {*} event
		 * @param {*} date
		 */
		onHoveringDateChange(date, event) {
			const {startDate, endDate, isHovering} = this.state
			const {onHoveringDateChange} = this.props
			if (range && isHovering) {
				this.setState({
					hoveringDate: date
				})
				if (startDate && startDate.isAfter(date)) {
					this.setState({
						startDate: null,
						endDate: startDate
					})
				} else if (endDate && endDate.isBefore(date)) {
					this.setState({
						startDate: endDate,
						endDate: null
					})
				}
			}
			onHoveringDateChange && onHoveringDateChange(date, event)
		}

		/**
		 * date change
		 * @param {*} event
		 * @param {*} date
		 */
		onDateChange(date, event) {
			const {startDate, endDate} = this.state
			const {onDateChange, onDateRangeChange} = this.props
			if (range) {
				if (!startDate && !endDate) {
					this.setState({
						startDate: date,
						isHovering: true
					})
				} else if (!startDate) {
					this.setState({
						startDate: date,
						isHovering: !endDate
					})
					onDateRangeChange && onDateRangeChange([date, endDate])
				} else if (!endDate) {
					if (date.isBefore(startDate)) {
						this.setState({
							startDate: date,
							endDate: startDate,
							isHovering: !startDate
						})
						onDateRangeChange && onDateRangeChange([date, startDate])
					} else {
						this.setState({
							endDate: date,
							isHovering: !startDate
						})
						onDateRangeChange && onDateRangeChange([startDate, date])
					}
				} else {
					this.setState({
						startDate: date,
						endDate: null,
						isHovering: true,
						hoveringDate: null
					})
				}
			} else {
				this.setState({
					startDate: date
				})
			}
			onDateChange && onDateChange(date, event)
		}

		render() {
			return (
				<WrapComponent
					{...this.props}
					{...this.state}
					onDateChange={this.onDateChange}
					onHoveringDateChange={this.onHoveringDateChange}/>
			)
		}
	}
}

export default EnhanceCalendar