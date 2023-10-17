package org.aravalieducation.stucon.entity;

import jakarta.persistence.*;

import java.io.Serializable;


@Entity
@Table(name = "scheduler_status_types", schema = "ref")
@NamedQuery(name = "SchedulerStatusType.findAll", query = "SELECT s FROM SchedulerStatusType s")
public class SchedulerStatusType implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "status_code")
    private String statusCode;

    @Column(name = "status_name")
    private String statusName;

    public SchedulerStatusType() {
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getStatusCode() {
        return this.statusCode;
    }

    public void setStatusCode(String statusCode) {
        this.statusCode = statusCode;
    }

    public String getStatusName() {
        return this.statusName;
    }

    public void setStatusName(String statusName) {
        this.statusName = statusName;
    }

}