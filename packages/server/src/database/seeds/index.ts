import fs from 'fs';
import * as database from '../';

fs.readdir(__dirname, async (err, files) => {
  await Promise.all(
    files.map(async file => {
      try {
        if (file.match(/index/)) return;

        await import(__dirname + '/' + file).then(module =>
          module.default(database)
        );
      } catch (err) {
        console.log(err);
      }
    })
  );
});
