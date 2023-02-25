const supertest = require('supertest')

const app = 'https://dev.ehealthier.com.au';
const u2ID = "7748a1f4-d736-485f-aa78-26b8e2eb9027"
const u4ID = "39cb4bcd-02e7-482e-ada7-bdb23d0fd0d9"

const headers = {
	'accept': 'application/json',
	'Content-Type': "application/json",
	'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1akNxV09TMldzcFFKTmF2MUhXMlhGIiwibmFtZSI6Ijc3NDhhMWY0LWQ3MzYtNDg1Zi1hYTc4LTI2YjhlMmViOTAyNyIsInVzZXIiOnsiaWQiOiI3NzQ4YTFmNC1kNzM2LTQ4NWYtYWE3OC0yNmI4ZTJlYjkwMjciLCJmaXJzdE5hbWUiOiJBY3F1aXJlci1UaXRsZTAxIiwibGFzdE5hbWUiOiJUZXN0Iiwicm9sZSI6MiwiZW1haWwiOiJjaW5uZXl0ZXN0MDFAZ21haWwuY29tIiwidXNlck5hbWUiOiJjaW5uZXl0ZXN0MDFAZ21haWwuY29tIiwibWZhRW5hYmxlZCI6MCwidGl0bGUiOiJNcnMuIiwiZGFzaGJvYXJkSWQiOm51bGx9LCJzY29wZXMiOm51bGwsImlhdCI6MTY3NzM0ODIxNSwiZXhwIjoxNjc3NDM0NjQ1fQ.kWQ_9QmhPLITWULrSOtTyduuIPfAEvIL4OzLSpcG66o'
}

describe('eHealthier Tests', () => {
	describe('User APIs', () => {
		describe('Given a user Does Exists', () => {
			it('should return 200 and user', async () => {

				const response = await supertest(app).get(`/api/users/${u4ID}`).set(headers)
				if (response.status !== 200) {
					console.error(`Get USER ${JSON.stringify(response.body, null, 4)}`);
				}
				expect(response.status).toBe(200)
				expect(response.body.data.id).toBe(u4ID)

			});
		});
		describe('Given a user Does Not Exists', () => {
			it('should return 404', async () => {

				const response = await supertest(app)
					.get('/api/users/39cb4bcd-02e7-482e-ada7-d9')
					.set(headers)
				if (response.status !== 404) {
					console.error(`Failed to return 404 if user does not exists ${JSON.stringify(response.body, null, 4)}`);
				}
				expect(response.status).toBe(404)


			});
		});
	});
	describe('Corporate APIs', () => {
		describe('Given the right payload', () => {
			it('should create a corporate with 200', async () => {

				const corporatePayload = {
					phnId: "34f15260-9cbb-11eb-bf86-e9a6c36e030b",
					name: "Test",
					principalId: "d7db657a-6612-4063-b000-26815437729f",
					principalName: "Test",
					ihi: "3535074298880579",
					status: 1,
					target: 500
				}

				const response = await supertest(app)
					.post('/api/corporates')
					.send(corporatePayload)
					.set(headers);

				if (response.status !== 200) {
					console.error(`Failed to create new corporate: ${response.status} \n Errors: ${JSON.stringify(response.body, null, 4)}`);
				}
				expect(response.status).toBe(200);
				expect(response.body).toBeDefined();
			});
		});
		describe('Given the right payload', () => {
			it('should update a corporate with 200', async () => {

				let corpId = '3ebcd210-b2da-11ed-a041-4f8e949b8ac6'

				const corpUpdatePayload = {
					ihi: "9845678364367433",
					target: "98",
					principalId: "408e92b1-c3cf-49c2-b638-92c02d2f2082",
					name: "Test123",
				}

				const response = await supertest(app)
					.put(`/api/corporates/${corpId}`)
					.send(corpUpdatePayload)
					.set(headers);

				if (response.status !== 200) {
					console.error(`Failed to update new corporate: ${response.status} ${JSON.stringify(response.body, null, 4)}`);
				}

				expect(response.status).toBe(200);
				expect(response.body).toBeDefined();
			});
		});
		describe('Given the right Auth Token', () => {
			it('should return a list of corporates with 200', async () => {
				const page = 1;
				const pageSize = 22;

				const response = await supertest(app)
					.get(`/api/corporates?page=${page}&pageSize=${pageSize}`)
					.set(headers)
					.set('phnId', '3fa85f64-5717-4562-b3fc-2c963f66afa6',)

				expect(response.status).toBe(200);
				expect(response.body.data.rows.length).toBe(pageSize);
			});
		});
	});
});