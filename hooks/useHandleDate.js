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

	const newDateByDay = (day, hours, minute, weekIter) => {
		const date = new Date(day);
		date.setHours(hours);
		date.setMinutes(minute);
		const result = new Date(date.setDate(date.getDate() + weekIter * 7));
		return result.toISOString();
	};

	const parseDateList = (scheduleString) => {
		const listSchedule = scheduleString.split(";");
		let listScheduleFormatted = [];
		for (var i = 0; i < listSchedule.length - 1; i++) {
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

	const newDateList = (scheduleArray, iteration) => {
		scheduleArray.sort((a, b) => new Date(a.day) - new Date(b.day));
		let dateList = "";
		for (const item of scheduleArray) {
			for (let i = 0; i < iteration; i++) {
				const timeStart = item.time_start.split(":");
				const timeEnd = item.time_end.split(":");
				const dateStart = newDateByDay(item.day, timeStart[0], timeStart[1], i);
				const dateEnd = newDateByDay(item.day, timeEnd[0], timeEnd[1], i);
				dateList += dateStart + "," + dateEnd + ";";
			}
		}
		return dateList;
	};

	return { parseDateList, newDateByDay, formatDatetime, newDateList };
}
