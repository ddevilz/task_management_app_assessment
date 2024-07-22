import request from "supertest";
import { expect } from "chai";
import mongoose from "mongoose";
import app from "../src/app.js";
import { config } from "../src/config/index.js";

describe("Tasks API", function () {
  before(function (done) {
    mongoose
      .connect(config.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => done())
      .catch(done);
  });

  after(function (done) {
    mongoose.connection.close(done);
    done();
  });

  let taskId;

  it("should create a new task", function (done) {
    request(app)
      .post("/api/v1/create")
      .send({
        title: "Test Task",
        description: "This is a test task",
        priority: "LOW",
        dueDate: "2024-12-31",
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.success).to.be.true;
        expect(res.body.task).to.have.property("_id");
        taskId = res.body.task._id;
        done();
      });
  });

  it("should get a list of tasks", function (done) {
    request(app)
      .get("/api/v1/tasks")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.success).to.be.true;
        expect(res.body.tasks).to.be.an("array");
        done();
      });
  });

  it("should update a task", function (done) {
    request(app)
      .put(`/api/v1/update/${taskId}`)
      .send({
        title: "Updated Test Task",
        description: "This is an updated test task",
        priority: "MEDIUM",
        dueDate: "2025-12-31",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.success).to.be.true;
        expect(res.body.task.title).to.equal("Updated Test Task");
        done();
      });
  });

  it("should delete a task", function (done) {
    request(app)
      .delete(`/api/v1/delete/${taskId}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.success).to.be.true;
        done();
      });
  });
});
