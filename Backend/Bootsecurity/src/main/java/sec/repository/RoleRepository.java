package sec.repository;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

import sec.model.ERole;
import sec.model.Role;

public interface RoleRepository extends MongoRepository<Role, String> {
  Optional<Role> findByName(ERole name);
}
