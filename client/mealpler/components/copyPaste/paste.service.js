class PasteService {
    constructor (DayService, StorageService, notify) {
        Object.assign(this, {DayService, StorageService, notify});
    }

    /**
     *
     * @param {string} name
     * @param {number} mealNo
     * @param {Moment} date
     * @param {string} userId
     * @return {Promise<void>}
     */
    pasteMeal(name, mealNo, date, userId) {
        const stored = this.StorageService.getLocalStorageData(name);
        if (stored === null) {
            return this.showPasteError();
        } else {
            return this.DayService.updateDayInfo(stored, date, userId, 'stored', mealNo);
        }
    };

    /**
     *
     * @param {Moment} date
     * @param {string} userId
     * @return {Promise<void>}
     */
    pasteDay(date, userId) {
        const stored = this.StorageService.getLocalStorageData("day");
        if (stored === null) {
            return this.showPasteError();
        } else {
            const fullDateName = date.format("YYYY-M-D");
            const dayNewContent = new Day(date);
            dayNewContent.meals = stored.slice();
            return this.DayService.cleanAndSetDayMealsList(fullDateName, dayNewContent, userId);
        }
    }

    /**
     *
     * @return {Promise<void>}
     */
    showPasteError() {
        this.notify.show('Nothing to paste. Copy something.', 'error');
        return Promise.reject(new Error('PasteError: Nothing to paste!'));
    }

}

Mealpler.service('paste', PasteService);