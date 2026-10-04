import { Admin } from '../models/index.js';
import sequelize from './database.js';

const seedAdmin = async () => {
  try {
    await sequelize.sync();
    
    const adminExists = await Admin.findOne({ where: { email: 'admin@pavsoftware.com' } });
    
    if (!adminExists) {
      await Admin.create({
        email: 'admin@pavsoftware.com',
        password: 'admin123'
      });
      console.log('✅ Default admin created: admin@pavsoftware.com / admin123');
    } else {
      console.log('ℹ️ Admin already exists, skipping seed.');
    }
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
  }
};

export default seedAdmin;
