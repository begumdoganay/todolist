// app.js
class TodoApp {
    constructor() {
        this.initializeManagers();
        this.initializeUI();
        this.loadTasks();
    }

    initializeManagers() {
        // Alt sistemlerin başlatılması
        this.themeManager = new ThemeManager();
        this.languageManager = new LanguageManager();
        this.notificationManager = new NotificationManager();
        this.taskManager = new TaskManager(this);
        this.voiceCommandManager = new VoiceCommandManager(this);
    }

    initializeUI() {
        // Form elementleri
        this.taskForm = document.getElementById('taskForm');
        this.taskInput = document.getElementById('taskTitle');
        this.locationSelect = document.getElementById('taskLocation');
        this.dateInput = document.getElementById('taskDate');
        this.startTimeInput = document.getElementById('taskStartTime');
        this.endTimeInput = document.getElementById('taskEndTime');
        this.prioritySelect = document.getElementById('taskPriority');
        this.statusSelect = document.getElementById('taskStatus');
        
        // Liste container
        this.taskList = document.getElementById('taskList');

        // Event listener'ların eklenmesi
        this.addEventListeners();
        
        // Bugünün tarihini varsayılan olarak ayarla
        this.setDefaultDate();
    }

    addEventListeners() {
        // Form submit
        this.taskForm.addEventListener('submit', (e) => this.handleSubmit(e));

        // Zaman doğrulaması
        this.startTimeInput.addEventListener('change', () => this.validateTimes());
        this.endTimeInput.addEventListener('change', () => this.validateTimes());

        // Scroll olayı için
        window.addEventListener('scroll', () => this.handleScroll());
    }

    setDefaultDate() {
        const today = new Date().toISOString().split('T')[0];
        this.dateInput.value = today;
        this.dateInput.min = today; // Geçmiş tarihleri devre dışı bırak
    }

    validateTimes() {
        const date = this.dateInput.value;
        const startTime = this.startTimeInput.value;
        const endTime = this.endTimeInput.value;

        if (startTime && endTime) {
            const startDateTime = new Date(`${date}T${startTime}`);
            const endDateTime = new Date(`${date}T${endTime}`);

            if (endDateTime <= startDateTime) {
                this.notificationManager.show('Bitiş saati başlangıç saatinden sonra olmalıdır', 'error');
                this.endTimeInput.value = '';
                return false;
            }
        }
        return true;
    }

    handleSubmit(e) {
        e.preventDefault();

        if (!this.validateTimes()) return;

        const task = {
            id: Date.now(),
            title: this.taskInput.value.trim(),
            location: this.locationSelect.value,
            date: this.dateInput.value,
            startTime: this.startTimeInput.value,
            endTime: this.endTimeInput.value,
            priority: this.prioritySelect.value,
            status: this.statusSelect.value,
            createdAt: new Date().toISOString(),
            completed: false
        };

        this.taskManager.addTask(task);
        this.taskForm.reset();
        this.setDefaultDate();
    }

    handleScroll() {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            this.taskManager.loadMoreTasks();
        }
    }

    loadTasks() {
        this.taskManager.loadTasks();
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    window.todoApp = new TodoApp();
});