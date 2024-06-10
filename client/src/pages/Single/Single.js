import React, { useEffect, useState } from 'react';
import styles from './Single.module.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router';
import services from '../../util/services';
import Spinner from '../../components/Spinner/Spinner';
import { Link } from 'react-router-dom';

const Single = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const [data, setData] = useState();
  const id = location.state?.id;

  const fetchAllData = async (id) => {
    try {
      const result = await services.findUserById(id);
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllData(id);
  }, [id]);


  const handleDelete = async () => {
    try {
      const result = await services.removeUser(id);
      if(result.status === 200){
        navigate('/all')
      }
    } catch (error) {
      console.log(error)
    }

  }


  return (
    <div className={styles.Single}>
      {data ? (
        <Card sx={{}}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color='text.secondary'
              gutterBottom
            >
              No: {data._id}
            </Typography>
            <Typography variant='h5' component='div'>
              {`${data.firstName} ${data.lastName}`}
            </Typography>

            <Typography variant='body2' sx={{ my: 1.5 }} color='text.secondary'>
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
                  <Link
                    to={{
                      pathname: `/edit/${data._id}`,
                    }}
                    state={{id: data._id}}
                    style={{textDecoration: 'none', color:'#1976D2'}}
                  >
                    Edit
                  </Link>
                  <Button size="small" color='error' onClick={handleDelete}>Delete</Button>
                </CardActions>
        </Card>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Single;
