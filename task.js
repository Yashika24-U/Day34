//

db.createCollection("users")
db.createCollection("codekata")
db.createCollection("attendace")
db.createCollection("topics")
db.createCollection("tasks")
db.createCollection("company_drives")
db.createCollection("mentor")

db.users.insertMany(
    [
        { name: "Alice"},
        {name: "Alan" },
        { name: "Bob" },
        { name: "Charlie"},
        { name : "Krish"}
    
    ]);


db.topics.insertMany([
        { name: "Array" },
        { name: "Strings" },
        { name: "Linkedlist"},
        { name: "Stack"},
        { name: "Queues"}
      ]);

db.tasks.insertMany([
        { task: "Task 1", status:"submitted"},
        { task: "Task 2",  status:"submitted" },
        { task: "Task 3",  status:"not submitted" },
        { task: "Task 4",  status:" not submitted" },
        { task: "Task 5",  status:"submitted" }
      ]);


      db.company_drives.insertMany([
        { name: "Drive 1", date: "2020-10-20" },
        { name: "Drive 2", date: "2020-10-25" },
        { name: "Drive 3", date: "2020-11-05" },
        { name: "Drive 4", date: "2020-11-10" },
        { name: "Drive 5", date: "2020-11-20" },

      ]);

      db.attendance.insertMany([
        { user: "Alice", date: "2020-10-15", status: "present" },
        { user: "Alan", date: "2020-10-17", status: "present" },
        { user: "Bob", date: "2020-10-20", status: "absent" },
        { user: "Charlie", date: "2020-10-25", status: "absent" },
        { user: "Krish", date: "2020-10-27", status: "present" },
      ]);


      db.mentors.insertMany([
        { name: "Mentor A", mentees: ["Alice", "Bob", "Charlie"] },
        { name: "Mentor B", mentees: ["Alice", "Alan","Bob"] },
        { name: "Mentor C", mentees: ["Charlie","Krish"] }
      ]);

      db.codekata.insertMany([
        { user: "Alice", solvedProblems: 10 },
        { user: "Alan", solvedProblems: 40 },
        { user: "Bob", solvedProblems: 15 },
        { user: "Charlie", solvedProblems: 8 },
        { user: "Krish", solvedProblems: 50 },
      ]);

// =====================================================================
      db.topics.find();
// =====================================================================
      db.company_drives.find({
        date: { $gte: "2020-10-15", $lte: "2020-10-31" }
      }).pretty();
// =====================================================================
db.company_drives.aggregate([
    {
      $lookup: {
        from: "attendance",
        localField: "name",
        foreignField: "user",
        as: "attendees"
      }
    }
  ]);

      db.codekata.aggregate([
        { $match: { user: "Alice" } },
        { $group: { _id: null, problemsSolved: { $sum: "$solvedProblems" } } }
      ]).pretty();

// =====================================================================

db.mentors.find({ $where: "this.mentees.length > 15" });

// =====================================================================
db.attendance.find({
    date: { $gte: "2020-10-15", $lte: "2020-10-31" },
    status: "absent"
  });
  db.tasks.find({
    date: { $gte: "2020-10-15", $lte: "2020-10-31" },
    status: "not submitted"
  }
// ==============================================================
  )
