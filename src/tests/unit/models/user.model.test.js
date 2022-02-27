// const faker = require('./node-modules/faker');
const { User } = require('./../../../models');

describe('User model', () => {
    describe('User validation', () => {
        let newUser;
        beforeEach(() => {
            newUser = {
                firstName: 'Shariful',
                lastName: 'Islam',
                email: 'shariful@gmail.com',
                password: 'password1',
                confirmPassword: 'password1'
            };
        });

        test('should correctly validate a valid user', async () => {
            await expect(new User(newUser).validate()).resolves.toBeUndefined();
        });

        test('should throw a validation error if email is invalid', async () => {
            newUser.email = 'invalidEmail';
            await expect(new User(newUser).validate()).rejects.toThrow();
        });

        test('should throw a validation error if password length is less than 8 characters', async () => {
            newUser.password = 'passwo1';
            await expect(new User(newUser).validate()).rejects.toThrow();
        });

        test('should throw a validation error if password does not contain numbers', async () => {
            newUser.password = 'password';
            await expect(new User(newUser).validate()).rejects.toThrow();
        });

        test('should throw a validation error if password does not contain letters', async () => {
            newUser.password = '11111111';
            await expect(new User(newUser).validate()).rejects.toThrow();
        });
    });
});
