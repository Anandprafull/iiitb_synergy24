import * as dotenv from "dotenv";
import * as schema from "@/server/db/schema";

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

// helps the seeding script read from `.env`
// important for connecting to the database
dotenv.config();

const connector = neon(process.env.DATABASE_URL as string);

const db = drizzle(connector, { schema });

const main = async () => {
  try {
    console.log("🟠 Seeding database");

    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.courses);
    await db.delete(schema.challenges);
    await db.delete(schema.userProgress);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.userSubscription);

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "Kannada",
        imageSrc: "/kannada.svg",
      },
      {
        id: 2,
        title: "Telugu",
        imageSrc: "/it.svg",
      },
      {
        id: 3,
        title: "Tamil",
        imageSrc: "/fr.svg",
      },
      {
        id: 4,
        title: "Hindi",
        imageSrc: "/hr.svg",
      },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1,
        title: "Unit 1",
        description: "Learn the basics of Kannada",
        order: 1,
      },
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1,
        order: 1,
        title: "Nouns",
      },
      {
        id: 2,
        unitId: 1,
        order: 2,
        title: "Verbs",
      },
      {
        id: 3,
        unitId: 1,
        order: 3,
        title: "Verbs",
      },
      {
        id: 4,
        unitId: 1,
        order: 4,
        title: "Verbs",
      },
      {
        id: 5,
        unitId: 1,
        order: 5,
        title: "Verbs",
      },
    ]);
//till here we have defined total lessons in 1 unit
    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1,
        type: "SELECT",
        order: 1,
        question: 'Which one of these is the "the man"?',
      },
      {
        id: 2,
        lessonId: 1,
        type: "ASSIST",
        order: 2,
        question: '"the man"',
      },
      {
        id: 3,
        lessonId: 1,
        type: "SELECT",
        order: 3,
        question: 'Which one of these is the "the robot"?',
      },
    ]);
//Inserted 3 challenge into lesson 1
    
    await db.insert(schema.challengeOptions).values([
      {
        id: 1,
        challengeId: 1, //which one of this is man?
        imageSrc: "/man.png",
        correct: true,
        text: "Purusha",
        audioSrc: "/kd/man.mp3",
      },
      {
        id: 2,
        challengeId: 1, //
        imageSrc: "/woman.png",
        correct: false,
        text: "Mahiḷe",
        audioSrc: "/kd/woman.mp3",
      },
      {
        id:3,
        challengeId: 1,
        imageSrc: "/robot.svg",
        correct: false,
        text: "Robot",
        audioSrc: "/ka/robot.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id:4,
        challengeId: 2,
        correct: true,
        text: "Purusha",
        audioSrc: "/kd/man.mp3",
      },
      {
        id:5,
        challengeId: 2,
        correct: false,
        text: "Mahiḷe",
        audioSrc: "/kd/woman.mp3",
      },
      {
        id:6,
        challengeId: 2,
        correct: false,
        text: "Robot",
        audioSrc: "/kd/robot.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id:7,
        challengeId: 3,
        imageSrc: "/man.png",
        correct: false,
        text: "Purusha",
        audioSrc: "/kd/man.mp3",
      },
      {
        id:8,
        challengeId: 3,
        imageSrc: "/woman.png",
        correct: false,
        text: "Mahile",
        audioSrc: "/kd/woman.mp3",
      },
      {
        id:9,
        challengeId: 3,
        imageSrc: "/robot.png",
        correct: true,
        text: "Robot",
        audioSrc: "/kd/robot.mp3",
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 4,
        lessonId: 2,
        type: "SELECT",
        order: 1,
        question: 'Which one of these is the "the boy"?',
      },
      {
        id: 5,
        lessonId: 2,
        type: "ASSIST",
        order: 2,
        question: '"the boy"',
      },
      {
        id: 6,
        lessonId: 2,
        type: "SELECT",
        order: 3,
        question: 'Which one of these is the "the man"?',
      },
    ]);
    //Inserted lesson 2 challenges(3)

    await db.insert(schema.challengeOptions).values([
      {
        id:10,
        challengeId: 4,
        imageSrc: "/boy.png",
        correct: true,
        text: "Huduga",
        audioSrc: "/kd/boy.mp3",
      },
      {
        id:11,
        challengeId: 4,
        imageSrc: "/man.png",
        correct: false,
        text: "Purusha",
        audioSrc: "/kd/man.mp3",
      },
      {
        id:12,
        challengeId: 4,
        imageSrc: "/woman.png",
        correct: false,
        text: "Mahila",
        audioSrc: "/kd/woman.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id:14,
        challengeId: 5,
        //imageSrc: "/boy.svg",
        correct: true,
        text: "Huduga",
        audioSrc: "/kd/boy.mp3",
      },
      {
        id:13,
        challengeId: 5,
        //imageSrc: "/man.svg",
        correct: false,
        text: "Purusha",
        audioSrc: "/kd/man.mp3",
      },
      {
        id:15,
        challengeId: 5,
        //imageSrc: "/woman.svg",
        correct: false,
        text: "Mahila",
        audioSrc: "/kd/woman.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id:16,
        challengeId: 6,
        imageSrc: "/robot.svg",
        correct: false,
        text: "Robot",
        audioSrc: "/kd/robot.mp3",
      },
      {
        id:18,
        challengeId: 6,
        imageSrc: "/boy.png",
        correct: false,
        text: "Huduga",
        audioSrc: "/kd/boy.mp3",
      },
      {
        id:17,
        challengeId: 6,
        imageSrc: "/man.png",
        correct: true,
        text: "Purusha",
        audioSrc: "/kd/boy.mp3",
      },
    ]);
    // lesson 2 completed and now making challenges for lesson 3
    await db.insert(schema.challenges).values([
      {
        id: 7,
        lessonId: 3,
        type: "ASSIST",
        order: 1,
        question: 'Which one of these is the "the son"?',
      },
      {
        id: 8,
        lessonId: 3,
        type: "ASSIST",
        order: 2,
        question: '"the girl"',
      },
      {
        id: 9,
        lessonId: 3,
        type: "SELECT",
        order: 3,
        question: 'Which one of these is the "the umbrella"?',
      },
    ]);
    //Inserted lesson 3 challenges(3) now insesrting the challenge options(son,girl and umbrella)
    await db.insert(schema.challengeOptions).values([
      {
        id:19,
        challengeId: 7,
        //imageSrc: "/son.svg",
        correct: true,
        text: "Maga",
        audioSrc: "/kd/son.mp3",
      },
      {
        id:20,
        challengeId: 7,
        //imageSrc: "/girl.svg",
        correct: false,
        text: "Hudugi",
        audioSrc: "/kd/girl.mp3",
      },
      {
        id:21,
        challengeId: 7,
        //imageSrc: "/umbrella.svg",
        correct: false,
        text: "Chattri",
        audioSrc: "/kd/umbrella.mp3",
      },
    ]);
    await db.insert(schema.challengeOptions).values([
      {
        id:22,
        challengeId: 8,
        //imageSrc: "/son.svg",
        correct: false,
        text: "Maga",
        audioSrc: "/kd/son.mp3",
      },
      {
        id:23,
        challengeId: 8,
        //imageSrc: "/girl.svg",
        correct: true,
        text: "Hudugi",
        audioSrc: "/kd/girl.mp3",
      },
      {
        id:24,
        challengeId: 8,
        //imageSrc: "/umbrella.svg",
        correct: false,
        text: "Chattri",
        audioSrc: "/kd/umbrella.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id:25,
        challengeId: 9,
        imageSrc: "/umbrella.png",
        correct: true,
        text: "Chattri",
        audioSrc: "/kd/umbrella.mp3",
      },
      {
        id:26,
        challengeId: 9,
        imageSrc: "/son.png",
        correct: false,
        text: "Maga",
        audioSrc: "/kd/son.mp3",
      },
      {
        id:27,
        challengeId: 9,
        imageSrc: "/girl.png",
        correct: false,
        text: "Hudugi",
        audioSrc: "/kd/girl.mp3",
      },
    ]);
    // lesson 3 completed and now making challenges for lesson 4(clock,tiger,lion)
    await db.insert(schema.challenges).values([
      {
        id: 10,
        lessonId: 4,
        type: "ASSIST",
        order: 1,
        question: 'Which one of these is the "the clock"?',
      },
      {
        id: 11,
        lessonId: 4,
        type: "SELECT",
        order: 2,
        question: '"the tiger"',
      },
      {
        id: 12,
        lessonId: 4,
        type: "SELECT",
        order: 3,
        question: 'Which one of these is the "lion"?',
      },
    ]);
    //Inserted lesson 4 challenges(3) now insesrting the challenge options(clock,tiger,lion)

    await db.insert(schema.challengeOptions).values([
      {
        id:28,
        challengeId: 10,
        //imageSrc: "/tiger.svg",
        correct: false,
        text: "Huli",
        audioSrc: "/kd/tiger.mp3",
      },
      {
        id:29,
        challengeId: 10,
        //imageSrc: "/lion.svg",
        correct: false,
        text: "Simha",
        audioSrc: "/kd/lion.mp3",
      },
      {
        id:30,
        challengeId: 10,
        //imageSrc: "/clock.svg",
        correct: true,
        text: "Ghadige",
        audioSrc: "/kd/clock.mp3",
      },
    ]);
    
    await db.insert(schema.challengeOptions).values([
      {
        id:31,
        challengeId: 11,
        imageSrc: "/tiger.png",
        correct: true,
        text: "Huli",
        audioSrc: "/kd/tiger.mp3",
      },
      {
        id:32,
        challengeId: 11,
        imageSrc: "/lion.png",
        correct: false,
        text: "Simha",
        audioSrc: "/kd/lion.mp3",
      },
      {
        id:33,
        challengeId: 11,
        imageSrc: "/clock.png",
        correct: false,
        text: "Ghadige",
        audioSrc: "/kd/clock.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id:34,
        challengeId: 12,
        imageSrc: "/lion.png",
        correct: true,
        text: "Simha",
        audioSrc: "/kd/lion.mp3",
      },
      {
        id:35,
        challengeId: 12,
        imageSrc: "/tiger.png",
        correct: false,
        text: "Huli",
        audioSrc: "/kd/tiger.mp3",
      },
      {
        id:36,
        challengeId: 12,
        imageSrc: "/clock.png",
        correct: false,
        text: "Ghadige",
        audioSrc: "/kd/clock.mp3",
      },
    ]);
    // lesson 4 completed and now making challenges for lesson 5(student,peacock and apple)

    await db.insert(schema.challenges).values([
      {
        id: 13,
        lessonId: 5,
        type: "SELECT",
        order: 1,
        question: 'Which one of these is the "the student"?',
      },
      {
        id: 14,
        lessonId: 5,
        type: "ASSIST",
        order: 2,
        question: '"the peacock"',
      },
      {
        id: 15,
        lessonId: 5,
        type: "SELECT",
        order: 3,
        question: 'Which one of these is the "apple"?',
      },
    ]);
    //Inserted lesson 5 challenges(3) now insesrting the challenge options(student,peacock and apple)
    
    await db.insert(schema.challengeOptions).values([
      {
        id:37,
        challengeId: 13,
        imageSrc: "/student.png",
        correct: true,
        text: "Vidyarthi",
        audioSrc: "/kd/student.mp3",
      },
      {
        id:38,
        challengeId: 13,
        imageSrc: "/peacock.png",
        correct: false,
        text: "Navilu",
        audioSrc: "/kd/peacock.mp3",
      },
      {
        id:39,
        challengeId: 13,
        imageSrc: "/apple.png",
        correct: false,
        text: "Sebu",
        audioSrc: "/kd/apple.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id:40,
        challengeId: 14,
        //imageSrc: "/student.svg",
        correct: false,
        text: "Vidyarthi",
        audioSrc: "/kd/student.mp3",
      },
      {
        id:41,
        challengeId: 14,
        //imageSrc: "/peacock.svg",
        correct: true,
        text: "Navilu",
        audioSrc: "/kd/peacock.mp3",
      },
      {
        id:42,
        challengeId: 14,
        //imageSrc: "/apple.svg",
        correct: false,
        text: "Sebu",
        audioSrc: "/kd/apple.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id:43,
        challengeId: 15,
        imageSrc: "/apple.png",
        correct: true,
        text: "Sebu",
        audioSrc: "/kd/apple.mp3",
      },
      {
        id:44,
        challengeId: 15,
        imageSrc: "/student.png",
        correct: false,
        text: "Vidyarthi",
        audioSrc: "/kd/student.mp3",
      },
      {
        id:45,
        challengeId: 15,
        imageSrc: "/peacock.png",
        correct: false,
        text: "Navilu",
        audioSrc: "/kd/peacock.mp3",
      },
    ]);
    // lesson 5 completed and now making challenges for unit 2
    //starting unit 2
    await db.insert(schema.units).values([
      {
        id: 2,
        courseId: 1,
        title: "Unit 2",
        description: "Basics sentences and words of Kannada",
        order: 2,
      },
    ]);
    await db.insert(schema.lessons).values([
      {
        id: 6,
        unitId: 2,
        order: 6,
        title: "Sentences",
      },
      {
        id: 7,
        unitId: 2,
        order: 7,
        title: "Sentences",
      },
      {
        id: 8,
        unitId: 2,
        order: 8,
        title: "Sentences",
      },
      {
        id: 9,
        unitId: 2,
        order: 9,
        title: "Sentences",
      },
      {
        id: 10,
        unitId: 2,
        order: 10,
        title: "Sentences",
      },
    ]);
    await db.insert(schema.challenges).values([
      {
        id: 16,
        lessonId: 6,
        type: "ASSIST",
        order: 1,
        question: 'What is your name?',
      },
      {
        id: 17,
        lessonId: 6,
        type: "ASSIST",
        order: 2,
        question: "How old are you?",
      },
      {
        id: 18,
        lessonId: 6,
        type: "ASSIST",
        order: 3,
        question: 'Where are you from?',
      },
    ]);
    // lesson 1 completed and now making challenges options for lesson 1
    //you need to change the voice
    await db.insert(schema.challengeOptions).values([
      {
        id:46,
        challengeId: 16,
        //imageSrc: "/apple.svg",
        correct: false,
        text: "Niivu eṣṭu varṣadavaru?",
        audioSrc: "/kd/howoldareyou.mp3",
      },
      {
        id:47,
        challengeId: 16,
        //imageSrc: "/student.svg",
        correct: false,
        text: "neevu ellinavaru?",
        audioSrc: "/kd/whereareyoufrom.mp3",
      },
      {
        id:48,
        challengeId: 16,
        //imageSrc: "/peacock.svg",
        correct: true,
        text: "Ninna hesaru ēnu?",
        audioSrc: "/kd/whatisyourname.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id:49,
        challengeId: 17,
        //imageSrc: "/apple.svg",
        correct: true,
        text: "Niivu eṣṭu varṣadavaru?",
        audioSrc: "/kd/howoldareyou.mp3",
      },
      {
        id:50,
        challengeId: 17,
        //imageSrc: "/student.svg",
        correct: false,
        text: "Ninna hesaru ēnu?",
        audioSrc: "/kd/whatisyourname.mp3",
      },
      {
        id:51,
        challengeId: 17,
        //imageSrc: "/peacock.svg",
        correct: false,
        text: "neevu ellinavaru?",
        audioSrc: "/kd/whereareyoufrom.mp3",
      },
    ]);
    await db.insert(schema.challengeOptions).values([
      {
        id:52,
        challengeId: 18,
        //imageSrc: "/apple.svg",
        correct: true,
        text: "neevu ellinavaru?",
        audioSrc: "/kd/whereareyoufrom.mp3",
      },
      {
        id:53,
        challengeId: 18,
        //imageSrc: "/student.svg",
        correct: false,
        text: "Niivu eṣṭu varṣadavaru?",
        audioSrc: "/kd/howoldareyou.mp3",
      },
      {
        id:54,
        challengeId: 18,
        //imageSrc: "/peacock.svg",
        correct: false,
        text: "Ninna hesaru ēnu?",
        audioSrc: "/kd/whatisyourname.mp3",
      },
    ]);
    // Lesson 1 for unit 2 is done going for lesson 2 below.(orange,dog and cat)

    await db.insert(schema.challenges).values([
      {
        id: 19,
        lessonId: 7,
        type: "SELECT",
        order: 1,
        question: 'Which one of these is the "Orange"?',
      },
      {
        id: 20,
        lessonId: 7,
        type: "SELECT",
        order: 2,
        question: "The dog",
      },
      {
        id: 21,
        lessonId: 7,
        type: "ASSIST",
        order: 3,
        question: 'What is the meaning of "Cat"',
      },
    ]);
    // giving out lesson 2 of unit 2 options
    await db.insert(schema.challengeOptions).values([
      {
        id:55,
        challengeId: 19,
        imageSrc: "/dog.png",
        correct: false,
        text: "Naayi",
        audioSrc: "/kd/dog.mp3",
      },
      {
        id:56,
        challengeId: 19,
        imageSrc: "/cat.png",
        correct: false,
        text: "Beeku",
        audioSrc: "/kd/cat.mp3",
      },
      {
        id:57,
        challengeId: 19,
        imageSrc: "/orange.png",
        correct: true,
        text: "Kittale",
        audioSrc: "/kd/orange.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id:58,
        challengeId: 20,
        imageSrc: "/dog.png",
        correct: true,
        text: "Naayi",
        audioSrc: "/kd/dog.mp3",
      },
      {
        id:59,
        challengeId: 20,
        imageSrc: "/cat.png",
        correct: false,
        text: "Beeku",
        audioSrc: "/kd/cat.mp3",
      },
      {
        id:60,
        challengeId: 20,
        imageSrc: "/orange.png",
        correct: false,
        text: "Kittale",
        audioSrc: "/kd/orange.mp3",
      },
    ]);
    await db.insert(schema.challengeOptions).values([
      {
        id:61,
        challengeId: 21,
        //imageSrc: "/cat.png",
        correct: true,
        text: "Beeku",
        audioSrc: "/kd/cat.mp3",
      },
      {
        id:62,
        challengeId: 21,
        //imageSrc: "/dog.png",
        correct: false,
        text: "Naayi",
        audioSrc: "/kd/dog.mp3",
      },
      {
        id:63,
        challengeId: 21,
        //imageSrc: "/orange.png",
        correct: false,
        text: "Kittale",
        audioSrc: "/kd/orange.mp3",
      },
    ]);
    //done for lesson 2 unit 2 now going for lesson 3(fire water and hesaru)
    
    await db.insert(schema.challenges).values([
      {
        id: 22,
        lessonId: 8,
        type: "SELECT",
        order: 1,
        question: 'Which one of these is the "Fire"?',
      },
      {
        id: 23,
        lessonId: 8,
        type: "SELECT",
        order: 2,
        question: "Water",
      },
      {
        id: 24,
        lessonId: 8,
        type: "ASSIST",
        order: 3,
        question: 'Ninna hesaru ēnu?',
      },
    ]);
    // giving out lesson 3 of unit 2 options
    await db.insert(schema.challengeOptions).values([
      {
        id:64,
        challengeId: 22,
        imageSrc: "/fire.png",
        correct: true,
        text: "Benki",
        audioSrc: "/kd/fire.mp3",
      },
      {
        id:65,
        challengeId: 22,
        imageSrc: "/water.png",
        correct: false,
        text: "Niiru",
        audioSrc: "/kd/water.mp3",
      },
      {
        id:66,
        challengeId: 22,
        imageSrc: "/orange.png",
        correct: false,
        text: "Kittale",
        audioSrc: "/kd/orange.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id:67,
        challengeId: 23,
        imageSrc: "/fire.png",
        correct: false,
        text: "Benki",
        audioSrc: "/kd/fire.mp3",
      },
      {
        id:68,
        challengeId: 23,
        imageSrc: "/water.png",
        correct: true,
        text: "Niiru",
        audioSrc: "/kd/water.mp3",
      },
      {
        id:69,
        challengeId: 23,
        imageSrc: "/man.png",
        correct: false,
        text: "Purusha",
        audioSrc: "/kd/man.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id:70,
        challengeId: 24,
        //imageSrc: "/fire.png",
        correct: false,
        text: "Benki",
        audioSrc: "/kd/fire.mp3",
      },
      {
        id:71,
        challengeId: 24,
        //imageSrc: "/water.png",
        correct: false,
        text: "How old are you?",
        audioSrc: "/kd/howoldareyou.mp3",
      },
      {
        id:72,
        challengeId: 24,
        //imageSrc: "/orange.png",
        correct: true,
        text: "what is your name",
        audioSrc: "/kd/whatisyourname.mp3",
      },
    ]);
    //Completed lesson 3 of unit 2 now doing lesson 4
    await db.insert(schema.challenges).values([
      {
        id: 25,
        lessonId: 9,
        type: "SELECT",
        order: 1,
        question: 'Which one of these is the "the student"?',
      },
      {
        id: 26,
        lessonId: 9,
        type: "ASSIST",
        order: 2,
        question: '"the peacock"',
      },
      {
        id: 27,
        lessonId: 9,
        type: "SELECT",
        order: 3,
        question: 'Which one of these is the "apple"?',
      },
    ]);
    //now giving options
    
    await db.insert(schema.challengeOptions).values([
      {
        id:73,
        challengeId: 25,
        imageSrc: "/student.png",
        correct: true,
        text: "Vidyarthi",
        audioSrc: "/kd/student.mp3",
      },
      {
        id:74,
        challengeId: 25,
        imageSrc: "/peacock.png",
        correct: false,
        text: "Navilu",
        audioSrc: "/kd/peacock.mp3",
      },
      {
        id:75,
        challengeId: 25,
        imageSrc: "/apple.png",
        correct: false,
        text: "Sebu",
        audioSrc: "/kd/apple.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id:76,
        challengeId: 26,
        //imageSrc: "/student.svg",
        correct: false,
        text: "Vidyarthi",
        audioSrc: "/kd/student.mp3",
      },
      {
        id:77,
        challengeId: 26,
        //imageSrc: "/peacock.svg",
        correct: true,
        text: "Navilu",
        audioSrc: "/kd/peacock.mp3",
      },
      {
        id:78,
        challengeId: 26,
        //imageSrc: "/apple.svg",
        correct: false,
        text: "Sebu",
        audioSrc: "/kd/apple.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id:79,
        challengeId: 27,
        imageSrc: "/apple.png",
        correct: true,
        text: "Sebu",
        audioSrc: "/kd/apple.mp3",
      },
      {
        id:80,
        challengeId: 27,
        imageSrc: "/student.png",
        correct: false,
        text: "Vidyarthi",
        audioSrc: "/kd/student.mp3",
      },
      {
        id:81,
        challengeId: 27,
        imageSrc: "/peacock.png",
        correct: false,
        text: "Navilu",
        audioSrc: "/kd/peacock.mp3",
      },
    ]);
    //Completed lesson 4 of unit 2 now doing lesson 5(ondu,eradu and muuru)

    await db.insert(schema.challenges).values([
      {
        id: 28,
        lessonId: 10,
        type: "ASSIST",
        order: 1,
        question: 'Which one of these is = "ONDU"?',
      },
      {
        id: 29,
        lessonId: 10,
        type: "ASSIST",
        order: 2,
        question: "ERADU",
      },
      {
        id: 30,
        lessonId: 10,
        type: "ASSIST",
        order: 3,
        question: 'MUURU',
      },
    ]);
    //now giving options

    await db.insert(schema.challengeOptions).values([
      {
        id:82,
        challengeId: 28,
        //imageSrc: "/student.svg",
        correct: false,
        text: "TWO",
        audioSrc: "/kd/two.mp3",
      },
      {
        id:83,
        challengeId: 28,
        //imageSrc: "/peacock.svg",
        correct: true,
        text: "ONE",
        audioSrc: "/kd/one.mp3",
      },
      {
        id:84,
        challengeId: 28,
        //imageSrc: "/apple.svg",
        correct: false,
        text: "THREE",
        audioSrc: "/kd/three.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id:85,
        challengeId: 29,
        //imageSrc: "/student.svg",
        correct: true,
        text: "TWO",
        audioSrc: "/kd/two.mp3",
      },
      {
        id:86,
        challengeId: 29,
        //imageSrc: "/peacock.svg",
        correct: false,
        text: "ONE",
        audioSrc: "/kd/one.mp3",
      },
      {
        id:87,
        challengeId: 29,
        //imageSrc: "/apple.svg",
        correct: false,
        text: "THREE",
        audioSrc: "/kd/three.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id:88,
        challengeId: 30,
        //imageSrc: "/student.svg",
        correct: false,
        text: "TWO",
        audioSrc: "/kd/two.mp3",
      },
      {
        id:89,
        challengeId: 30,
        //imageSrc: "/apple.svg",
        correct: true,
        text: "THREE",
        audioSrc: "/kd/three.mp3",
      },
      {
        id:90,
        challengeId: 30,
        //imageSrc: "/peacock.svg",
        correct: false,
        text: "ONE",
        audioSrc: "/kd/one.mp3",
      },
    ]);
    //End of unit 2
    console.log("🟢 Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("🔴 Failed to seed database");
  }
};

main();
