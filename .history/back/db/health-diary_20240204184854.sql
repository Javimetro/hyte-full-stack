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

CREATE TABLE Feelings (
    feeling_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    feeling_date DATE NOT NULL,
    feeling_intensity INT NOT NULL,  -- Intensity of the feeling on a scale of 1-10
    feeling_type ENUM('Positive', 'Negative') NOT NULL,
    feeling_text TEXT NOT NULL,
    feeling_notes TEXT,  -- Additional notes or actions related to the thought
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);


CREATE TABLE ProfessionalSupport (
    session_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    session_date DATE NOT NULL,
    session_type VARCHAR(100),  -- E.g., Counseling, Therapy, Coaching
    session_duration INT,  -- Duration in minutes
    session_notes TEXT,  -- Summary or notes from the session
    follow_up_actions TEXT,  -- Recommended actions or next steps
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
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
    specialization VARCHAR(100)
);
