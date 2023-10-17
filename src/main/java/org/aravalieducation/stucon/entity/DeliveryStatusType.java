package org.aravalieducation.stucon.entity;

import jakarta.persistence.*;

import java.io.Serializable;


@Entity
@Table(name = "delivery_status_types", schema = "ref")
@NamedQuery(name = "DeliveryStatusType.findAll", query = "SELECT d FROM DeliveryStatusType d")
public class DeliveryStatusType implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "status_code")
    private String statusCode;

    @Column(name = "status_name")
    private String statusName;

    public DeliveryStatusType() {
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