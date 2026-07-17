import bcrypt from "bcrypt";


const hash = "$2b$10$fUSqrCeE2mrzxml7ZWJGSeNIv8q/RnlJyF3XvsNsCGwTiWm/0AcBi";


console.log(
bcrypt.compareSync(
"Admin@123",
hash
)
);
