export default function useHandleDate() {
	const formatDatetime = (datetime) => {
		const days = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		];
		const months = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		];
		const date = new Date(datetime);
		const day = date.getDate();
		const month = months[date.getMonth()];
		const year = date.getFullYear();
		const dayName = days[date.getDay()];
		const hours = date.getHours();
		const hoursFormatted = hours % 12 || 12;
		const minutes = date.getMinutes().toString();
		const minutesFormatted = minutes < 10 ? minutes.padStart(2, "0") : minutes;
		const period = hours < 12 ? "AM" : "PM";

		return {
			minutes: minutesFormatted,
			hours: hoursFormatted,
			period,
			dayName,
			day,
			month,
			year,
		};
	};

	const newDateByDay = (day, hours, minute) => {
		const now = new Date(Date.now() + 604800000);
		const date = new Date(
			now.getFullYear(),
			now.getMonth(),
			day,
			hours,
			minute
		);
		return date.toISOString();
	};

	const parseDateList = (scheduleString) => {
		const listSchedule = scheduleString.split(";");
		let listScheduleFormatted = [];
		for (var i = 0; i < listSchedule.length; i++) {
			var oneSchedule = listSchedule[i].split(",");
			var dateStart = formatDatetime(oneSchedule[0]);
			var dateEnd = formatDatetime(oneSchedule[1]);
			var hours = `(${dateStart.hours}:${dateStart.minutes}${dateStart.period} - ${dateEnd.hours}:${dateEnd.minutes}${dateEnd.period})`;
			var date = `${dateStart.dayName}, ${dateStart.day} ${dateStart.month} ${dateStart.year}`;
			listScheduleFormatted.push({
				date,
				hours,
			});
		}
		return listScheduleFormatted;
	};

	const newDateList = (scheduleArray) => {
		// const array
		scheduleArray.pop();
		scheduleArray.sort((a, b) => a.day - b.day);
		let dateList = "";
		for (const item of scheduleArray) {
			const timeStart = item.time_start.split(":");
			const timeEnd = item.time_end.split(":");
			const dateStart = newDateByDay(item.day, timeStart[0], timeStart[1]);
			const dateEnd = newDateByDay(item.day, timeEnd[0], timeEnd[1]);
			dateList += dateStart + "," + dateEnd + ";";
		}
		return dateList;
	};

	return { parseDateList, newDateByDay, formatDatetime, newDateList };
}
