/**
 * moysklad-client
 * Date: 16.07.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

describe('moysklad', function () {

    it('should have properties', function () {
        expect(moysklad).to.have.all.keys(
            'createClient',
            'createQuery',
            'tools',
            'logger',
            'version'
        );
    });

});

