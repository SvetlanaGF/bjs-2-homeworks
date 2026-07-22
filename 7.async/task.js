class AlarmClock {
  constructor() {
    this.alarmCollection = [];
    this.intervalId = null;
  }

  addClock(time, callback) {
    if (!time || !callback) {
      throw new Error("Отсутствуют обязательные аргументы");
    }

    for (let i = 0; i < this.alarmCollection.length; i++) {
      if (this.alarmCollection[i].time === time) {
        console.warn("Уже присутствует звонок на это же время");
        // Не выходим, просто предупреждаем
        break;
      }
    }

    this.alarmCollection.push({
      time: time,
      callback: callback,
      canCall: true
    });
  }

  removeClock(time) {
    this.alarmCollection = this.alarmCollection.filter(function (alarm) {
      return alarm.time !== time;
    });
  }

  getCurrentFormattedTime() {
    const date = new Date();
    // Форматируем часы и минуты в "HH:MM"
    const hours = date.getHours();
    const minutes = date.getMinutes();
    // Добавляем ведущий 0, если нужно
    const formattedHours = hours < 10 ? "0" + hours : String(hours);
    const formattedMinutes = minutes < 10 ? "0" + minutes : String(minutes);
    return formattedHours + ":" + formattedMinutes;
  }

  start() {
    if (this.intervalId !== null) {
      return; // Если уже запущен, ничего не делаем
    }

    this.intervalId = setInterval(() => {
      const currentTime = this.getCurrentFormattedTime();

      this.alarmCollection.forEach((alarm) => {
        if (alarm.time === currentTime && alarm.canCall) {
          alarm.canCall = false;
          alarm.callback();
        }
      });
    }, 1000);
  }

  stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  resetAllCalls() {
    this.alarmCollection.forEach((alarm) => {
      alarm.canCall = true;
    });
  }

  clearAlarms() {
    this.stop();
    this.alarmCollection = [];
  }
}