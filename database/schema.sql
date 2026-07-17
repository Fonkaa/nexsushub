-- Create Database
CREATE DATABASE IF NOT EXISTS nexushub;
USE nexushub;

-- USERS TABLE
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin','manager','employee') DEFAULT 'employee',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TEAM MEMBERS TABLE
CREATE TABLE team_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(30),
    department VARCHAR(100),
    position VARCHAR(100),
    status ENUM('Active','Inactive') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_team_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- WORK REQUESTS TABLE
CREATE TABLE work_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    requester_id INT,
    priority ENUM('Low','Medium','High') DEFAULT 'Medium',
    status ENUM('Pending','In Progress','Completed') DEFAULT 'Pending',
    assigned_to INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_request_user
        FOREIGN KEY (requester_id)
        REFERENCES users(id),

    CONSTRAINT fk_request_member
        FOREIGN KEY (assigned_to)
        REFERENCES team_members(id)
);

-- RESOURCES TABLE
CREATE TABLE resources (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(100),
    quantity INT DEFAULT 1,
    available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- REQUEST RESOURCES TABLE
CREATE TABLE request_resources (
    id INT AUTO_INCREMENT PRIMARY KEY,
    request_id INT,
    resource_id INT,

    CONSTRAINT fk_rr_request
        FOREIGN KEY (request_id)
        REFERENCES work_requests(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_rr_resource
        FOREIGN KEY (resource_id)
        REFERENCES resources(id)
        ON DELETE CASCADE
);