import { Selector, ClientFunction, Role } from 'testcafe';

const testUser = Role("https://hungry-tereshkova-7ccef7.netlify.app/", async t => {
    await t
    .typeText("#email", "user2@email.com")
    .typeText("#password", "password2")
    .click("#login_btn");
});


fixture`trips`.page`https://hungry-tereshkova-7ccef7.netlify.app/edittrip.html`;

const landSelect = Selector("#land_list");
const landOption = landSelect.find("option");

test("unsuccessful add#1", async t => {  
    var table = await Selector("#table1");
    var dataRows = table.find('tbody > tr');
    var dataRowCount = await dataRows.count;

    await t
        .useRole(testUser)
        .typeText("#tripname", "Reise A")
        .click(landSelect)
        .click(landOption.withText("Deutschland"))
        .typeText("#start", "2022-01-24")
        .click("#create_btn")
        .expect(await Selector("#table1").find("tbody > tr").count).eql(0);
});