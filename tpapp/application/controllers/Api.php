<?php
   
require APPPATH . 'libraries/REST_Controller.php';
     
class Api extends REST_Controller {
    
      /**
     * Get All Data from this method.
     *
     * @return Response
    */
    public function __construct() {
       parent::__construct();
       // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");         

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }

 
       $this->load->database();
    }
       
    /**
     * Get All Data from this method.
     *
     * @return Response
    */
    public function user_get()
    {
        $reponse_format = array('status' => false, 'message' => 'Authorization failed');
        $tp_token = $this->input->get_request_header('Authorization', TRUE);

        $tpc = explode(' ', $tp_token);
        $id = $this->input->get('id');

        if(!isset($tpc[1])) {
            $this->response($reponse_format, REST_Controller::HTTP_BAD_REQUEST);
        } else {
            if(!empty($id)) {
              $data = $this->db->get_where("users", ['id' => $id])->row_array();
              unset($data['password']);
            } else {
              $data = $this->db->get("users")->result();
              foreach ($data as $key => $value) {
                  unset($data[$key]->password);
              }
            }
            $reponse_format = array('status' => true);
            $reponse_format['data'] = $data;     
            $this->response($reponse_format, REST_Controller::HTTP_OK);
        }   

    }

    public function index_get() {

    }


    public function index_post() {
        
    }


    public function login_post()
    {
        $reponse_format = array('status' => false, 'data' => array('errors' => array()));
        $input = json_decode(file_get_contents('php://input'), true);
        $username = $input['username'] ?? null;
        $password = $input['password'] ?? null;
        if(empty($username)) { 
            $reponse_format = array('status' => false, 'data' => array('errors' =>
             array('username_error' => 'username missing')));
            $this->response($reponse_format , REST_Controller::HTTP_BAD_REQUEST);
        } else if(empty($password)) {
            $reponse_format = array('status' => false, 'data' => array('errors' => array('password_error' => 'password missing')));
            $this->response($reponse_format, REST_Controller::HTTP_BAD_REQUEST);
        } else {
             $data = $this->db->get_where("users", ['username' => $username, 'password' => $password])->row_array();

             if($data) {
                unset($reponse_format['data']);
                $reponse_format['status'] = true;
                $reponse_format['idToken'] = $data['token'];
                $this->response($reponse_format, REST_Controller::HTTP_OK);
             } else {
                $reponse_format = array('status' => false, 'data' => array('errors' => array('wrong_user' => 'username or password is wrong')));
                $this->response($reponse_format, REST_Controller::HTTP_BAD_REQUEST);
             }
        }
    }
      
    /**
     * Get All Data from this method.
     *
     * @return Response
    */
    public function register_post()
    {
        $reponse_format = array('status' => false, 'data' => array('errors' => array()));
        $input = json_decode(file_get_contents('php://input'), true);
        //$input = $this->input->post();
        unset($input['confirm_password']);
        if(!isset($input['username'])) {
            $reponse_format = array('status' => false, 'data' => array('errors' =>
             array('username_error' => 'username missing')));
            $this->response($reponse_format, REST_Controller::HTTP_BAD_REQUEST);
        } else if(!isset($input['password'])) {
            $reponse_format = array('status' => false, 'data' => array('errors' => array('password_error' => 'password missing')));
            $this->response($reponse_format, REST_Controller::HTTP_BAD_REQUEST);
        } else if(!isset($input['email'])) {
            $reponse_format = array('status' => false, 'data' => array('errors' => array('email_error' => 'email missing')));
            $this->response($reponse_format, REST_Controller::HTTP_BAD_REQUEST);
        } else {
            $user = $this->db->get_where("users", ['email' => $input['email']])->row_array();
            if($user) {
             $reponse_format = array('status' => false, 'data' => array('errors' => array('email_error' => 'email already exists')));
            $this->response($reponse_format, REST_Controller::HTTP_BAD_REQUEST);
            } else {
                $input['token'] = session_create_id();
                $id = $this->db->insert('users',$input);
                if($id > 0) {
                    unset($reponse_format['data']);
                    $reponse_format['status'] = true;
                    $reponse_format['idToken'] = $input['token'];  
                    $this->response($reponse_format, REST_Controller::HTTP_OK);
                } else {
                    $this->response($reponse_format, REST_Controller::HTTP_BAD_REQUEST);
                }
            }       

        }
        
    } 
     
    /**
     * Get All Data from this method.
     *
     * @return Response
    */
    public function userupdate_put()
    {
        $reponse_format = array('status' => false, 'message' => 'Authorization Failed');
        $input = $this->put();
        $tp_token = $this->input->get_request_header('Authorization', TRUE);
        $tpc = explode(' ', $tp_token);

        if(!isset($tpc[1])) {
            $this->response($reponse_format, REST_Controller::HTTP_BAD_REQUEST);
        } else {
            $user = $this->db->get_where("users", ['token' => $tpc[1]])->row_array();
            if(isset($user['id'])) {                    
                if(count($input) < 1)   {
                    unset($reponse_format['message']);
                    $reponse_format['errors'] = array('general_error' => 'data missing');   
                    $this->response($reponse_format, REST_Controller::HTTP_BAD_REQUEST);
                } else {
                    $reponse_format['status'] = true;  
                    $reponse_format['message'] = 'User updated successfully.';  
                    $this->db->update('users', $input, array('id'=>$user['id']));        
                    $this->response($reponse_format, REST_Controller::HTTP_OK);                 
                }
            } else {
                $this->response($reponse_format, REST_Controller::HTTP_BAD_REQUEST);
            }
        }
    }
     
    /**
     * Get All Data from this method.
     *
     * @return Response
    */
    public function userdelete_delete($id)
    {
        $reponse_format = array('status' => false, 'message' => 'Authorization Failed');

        $tp_token = $this->input->get_request_header('Authorization', TRUE);
        $tpc = explode(' ', $tp_token);

        if(!isset($tpc[1])) {
            $this->response($reponse_format, REST_Controller::HTTP_BAD_REQUEST);
        } else {
            $user = $this->db->get_where("users", ['token' => $tpc[1]])->row_array();
            if(isset($user['id'])) {
                if($id > 0)  {                  
                    $reponse_format['status'] = true;  
                    $reponse_format['data'] = array('message' => 'User updated successfully.');  
                    $this->db->delete('users', array('id'=>$id));       
                    $this->response(['User deleted successfully.'], REST_Controller::HTTP_OK);
                } else {
                    $reponse_format['status'] = false;  
                    $reponse_format['data'] = array('errors' => array('id_error' => 'user id missing')); 
                    $this->response($reponse_format, REST_Controller::HTTP_BAD_REQUEST);
                }
            } else {
                $this->response($reponse_format, REST_Controller::HTTP_BAD_REQUEST);
            }
        }
    }
        
}