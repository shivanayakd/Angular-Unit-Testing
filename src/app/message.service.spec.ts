import { MessageService } from './message.service';

describe('# message Service', () => {
   let msgserve: MessageService;

    beforeEach(() => {
        msgserve = new MessageService();
    });

    it('Messages array to be empty on load', () => {
        expect(msgserve.messages.length).toBe(0);
    })

    it('On Add message it shoud be added', () => {
        let msg ='New Message';
        msgserve.add(msg);
        expect(msgserve.messages.length).toBe(1);
    })

    it('Messages should be Empty when clear is called', () => {
        let msg ='New Message';
        msgserve.add(msg);
        expect(msgserve.messages.length).toBe(1);
        msgserve.clear();
        expect(msgserve.messages.length).toBe(0);
    })
});