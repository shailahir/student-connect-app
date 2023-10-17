package org.aravalieducation.stucon.schedule;

import org.aravalieducation.stucon.service.ScheduledTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Scheduled;

@Configuration
public class Scheduler {


    @Autowired
    private ScheduledTaskService scheduledTaskService;

    @Scheduled(cron = "0 */5 * ? * *")
    public void checkAndProcessMessages() {
        scheduledTaskService.processMessages();
    }
}
