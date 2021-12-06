import bcrypt from 'bcryptjs';
const saltRounds = 10;
let password = '123123';
bcrypt.hash(password, saltRounds, function(err, hash) {
  // Store hash in database here
  password = hash;
});
conn = new Mongo();
db = conn.getDB("test");

db.collection.insert( "user", { email: "teacher@teacher.com", password: password, admin: true })

db.collection.insert( "user", { email: "student1@student.com", password: password, admin: false })
db.collection.insert( "user", { email: "student2@student.com", password: password, admin: false })
db.collection.insert( "user", { email: "student3@student.com", password: password, admin: false })
db.collection.insert( "assignment", { question: "When was BCIT's 50th-aniversary celebration?",
  answers: {
    answer1: "2016",
    answer2: "1967",
    answer3: "2017",
    answer4: "1987"
  },
  answer_type: "radio"
})
db.collection.insert( "assignment", {
  question: "Which of the following services does the LTC provide? Select all that apply.",
  answers: {
    answer1: "Technical illustration",
    answer2: "Instructional design",
    answer3: "Financial advice",
    answer4: "Admission and Registration",
    answer5: "Audio-visual loans"
  },
  answer_type: "checkbox"
})
db.collection.insert( "assignment", {
  question: "The current Prime Minister in Canada is (include the starting year for the PM)",
  answer_type: "text"
})
