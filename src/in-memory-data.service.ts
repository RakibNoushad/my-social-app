import { analyzeAndValidateNgModules } from '@angular/compiler';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { UserDetails } from './app/Services/user-service.service';

export class InMemoryDataService implements InMemoryDbService{
    createDb(){
        let users = [
            new UserDetails(1,"a@a", "Rakib", "Noushad", "aaaa", "admin" ),
            new UserDetails(2,"b@b", "Rakib", "Uddin", "aaaa", "user" )
        ];
        return {users};
    }

    genId(users: UserDetails[]): number {
        return users.length > 0 ? Math.max(...users.map(hero => hero.id)) + 1 : 4;
  }
}
