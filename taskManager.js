// app.js
import { TaskManager } from './managers/TaskManager.js';
import { ThemeManager } from './managers/ThemeManager.js';
import { NotificationManager } from './managers/NotificationManager.js';
import { LanguageManager } from './managers/LanguageManager.js';
import { VoiceCommandManager } from './managers/VoiceCommandManager.js';

class TodoApp {
    constructor() {
        this.initializeManagers();
        this.initializeUI();
        this.addEventListeners();
    }

    initializeManagers() {
        this.taskManager = new TaskManager(this);
        this.themeManager = new ThemeManager();
        this.notificationManager = new NotificationManager();
        this.languageManager = new LanguageManager();
        this.voiceCommandManager = new VoiceCommandManager(this);
    }

    initializeUI() {
        // Form elementlerini seç
        this.taskForm = document.getElementById('taskForm');
        this.taskInput = document.getElementById('taskTitle');
        this.taskDescription = document.getElementById('taskDescription');
        this.dateInput = document.getElementById('taskDate');
        this.startTimeInput = document.getElementById('taskStartTime');
        this.endTimeInput = document.getElementById('taskEndTime');
        this.locationInput = document.getElementById('taskLocation');
        this.prioritySelect = document.getElementById('taskPriority');
        this.statusSelect = document.getElementById('taskStatus');
        
        // Bugünün tarihini varsayılan olarak ayarla
        this.setDefaultDate();
    }

    addEventListeners() {
        // Form gönderimi
        this.taskForm.addEventListener('submit', this.handleSubmit.bind(this));

        // Zaman doğrulaması
        this.startTimeInput.addEventListener('change', this.validateTimes.bind(this));
        this.endTimeInput.addEventListener('change', this.validateTimes.bind(this));

        // Alt görev ekleme
        document.getElementById('addSubtaskBtn').addEventListener('click', 
            this.taskManager.addSubtask.bind(this.taskManager));

        // Etiket girişi
        const tagInput = document.getElementById('tagInput');
        tagInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.taskManager.addTag(tagInput.value);
                tagInput.value = '';
            }
        });
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
            description: this.taskDescription.value.trim(),
            location: this.locationInput.value,
            date: this.dateInput.value,
            startTime: this.startTimeInput.value,
            endTime: this.endTimeInput.value,
            priority: this.prioritySelect.value,
            status: this.statusSelect.value,
            subtasks: this.taskManager.getSubtasks(),
            tags: this.taskManager.getTags(),
            createdAt: new Date().toISOString(),
            completed: false
        };

        this.taskManager.addTask(task);
        this.taskForm.reset();
        this.setDefaultDate();
        this.taskManager.clearSubtasks();
        this.taskManager.clearTags();
    }
}

// Uygulamayı başlat
document.addEventListener('DOMContentLoaded', () => {
    window.todoApp = new TodoApp();
});