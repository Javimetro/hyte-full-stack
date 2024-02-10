
DROP DATABASE IF EXISTS HealthDiary;
CREATE DATABASE HealthDiary;
USE HealthDiary;

-- Create a table for users
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    university VARCHAR(100) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_level VARCHAR(10) NOT NULL DEFAULT 'regular'
);

CREATE TABLE Professionals (
    professional_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    gender ENUM('M', 'F') NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    work_location VARCHAR(100) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    credentials TEXT,
    specialization VARCHAR(255)
);

-- Create a table for diary entries
CREATE TABLE DiaryEntries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    entry_date DATE NOT NULL,
    mood VARCHAR(50),
    weight DECIMAL(5,2),
    sleep_hours INT,
    notes TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Sessions (
    session_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    professional_id INT NOT NULL,
    session_date DATE NOT NULL,
    session_type VARCHAR(100),  -- E.g., Counseling, Therapy, Coaching
    session_duration INT,  -- Duration in minutes
    session_notes TEXT,  -- Summary or notes from the session
    follow_up_actions TEXT,  -- Recommended actions or next steps
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (professional_id) REFERENCES Professionals(professional_id)
);

INSERT INTO Users (username, password, email, university) VALUES
('Seppo', '123', 'seppo@example.com', 'metropolia'),
('Peppi', '123', 'Peppi@example.com', 'aalto'),
('José', '123', 'José@example.com', 'metropolia'),
('Pirjo', '123', 'Pirjo@example.com', 'laurea'),
('Kimmo', '123', 'Kimmo@example.com', 'metropolia');

INSERT INTO professionals (username, password, gender, email, work_location, credentials, specialization) VALUES
('Viivi', '123', 'F', 'viivi@example.com', 'karamalmi', 'yliopiston tutkinto (psykoterapeuti)', 'masennuksen hoito'),
('Jussi', '123', 'M', 'jussi@example.com', 'kamppi', 'AMK tutkinto (terveyshoitaja)', 'ravitsemus ja hyvinvointi');

INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes) VALUES
  (1, '2024-02-5', 'happy', 70.5, 8, 'it was a good sleep'),
  (2, '2024-02-5', 'sad', 80.2, 6, 'my dog died yesterday'),
  (3, '2024-02-5', 'lazy', 55.0, 4, 'i just wanna play videogames'),
  (4, '2024-02-5', 'Calm', 100.0, 9, 'i took too many medicines'),
  (5, '2024-02-5', 'Fearful', 90.3, 5, 'someone is outside looking to my house');

insert into sessions (user_id, professional_id, session_date, session_type, session_duration, session_notes, follow_up_actions) values
(1, 1, '2024-02-5', 'Therapy', 60, 'next apoiment in one month, student is doing well', 'next month next appoiment'),
(2, 2, '2024-02-5', 'coaching', 45,'patient needed meditation exercises', 'no need for future appoiments'),
(3, 1, '2024-02-5', 'Therapy', 60, 'mood has worsened, patient is sent to the doctor', 'doctor will contact directly to me'),
(4, 1, '2024-02-5', 'Therapy', 60, 'every thing is ok','next appoiment in two weeks'),
(5, 2, '2024-02-5', 'consult', 45, 'patient needed nutricion advise', 'no need for future appoiments');

/*
 Use cases for the sql-query from the app point of view:

    1. Detect specific "dangerous" words in the notes of the diary entries:
        SELECT user_id, notes FROM DiaryEntries WHERE notes LIKE '%suicide%';
    This could send an alert to the user recomending to contact a professional or a friend.

    2. Get the average sleep hours for each user:
        SELECT user_id, AVG(sleep_hours) FROM DiaryEntries GROUP BY user_id;
    This could be used to detect if a user is not sleeping enough.

    3. Get and specific specialist from an user input in the app:
        SELECT professional_id FROM Professionals WHERE specialization =  'ravitsemus ja hyvinvointi';

    4. Updating the users password:
        UPDATE Users SET password = 'newpassword' WHERE username = 'Seppo';

*/







